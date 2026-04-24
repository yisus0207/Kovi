-- ==========================================
-- KOVEN SUITE - ENGINE (V9.1 - LOCKED & LOADED)
-- FULL ENTERPRISE SECURITY (RLS) & INTEGRITY
-- ==========================================

-- 0. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rol_usuario') THEN
        CREATE TYPE public.rol_usuario AS ENUM ('OWNER', 'CLIENTE', 'ADMIN');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estado_pago_sucursal') THEN
        CREATE TYPE public.estado_pago_sucursal AS ENUM ('ACTIVO', 'PENDIENTE', 'TRIAL', 'SUSPENDIDO');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estado_cita') THEN
        CREATE TYPE public.estado_cita AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA', 'NO_SHOW');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estado_mensaje') THEN
        CREATE TYPE public.estado_mensaje AS ENUM ('PENDIENTE', 'ENVIADO', 'ERROR', 'REINTENTANDO');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_mensaje') THEN
        CREATE TYPE public.tipo_mensaje AS ENUM ('RECORDATORIO_24H', 'RECORDATORIO_2H', 'PROMOCION', 'MANUAL', 'BIENVENIDA');
    END IF;
END $$;

-- 1. UTILS
CREATE OR REPLACE FUNCTION public.fn_set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

-- 2. MASTER: USUARIOS
CREATE TABLE public.usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    rol public.rol_usuario DEFAULT 'OWNER',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tr_usuarios_upd BEFORE UPDATE ON public.usuarios FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();

-- 3. MASTER: NEGOCIOS
CREATE TABLE public.negocios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES public.usuarios(id) NOT NULL,
    nombre TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tipo_negocio TEXT DEFAULT 'BARBERIA',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.negocios ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tr_negocios_upd BEFORE UPDATE ON public.negocios FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();

CREATE TABLE public.negocio_modulos (
    negocio_id UUID PRIMARY KEY REFERENCES public.negocios(id) ON DELETE CASCADE,
    modulo_agenda BOOLEAN DEFAULT TRUE,
    modulo_ia BOOLEAN DEFAULT FALSE,
    ia_tono TEXT DEFAULT 'relajado',
    ia_pautas TEXT
);
ALTER TABLE public.negocio_modulos ENABLE ROW LEVEL SECURITY;

-- 4. INFRA: SUCURSALES
CREATE TABLE public.sucursales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    negocio_id UUID REFERENCES public.negocios(id) ON DELETE CASCADE NOT NULL,
    nombre TEXT NOT NULL,
    slug TEXT NOT NULL,
    timezone TEXT DEFAULT 'America/Bogota' NOT NULL,
    estado_pago public.estado_pago_sucursal DEFAULT 'TRIAL',
    fecha_vencimiento TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(negocio_id, slug)
);
ALTER TABLE public.sucursales ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tr_sucursales_upd BEFORE UPDATE ON public.sucursales FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();

-- 5. STAFF & SERVICIOS
CREATE TABLE public.profesionales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    negocio_id UUID REFERENCES public.negocios(id) NOT NULL,
    nombre TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profesionales ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tr_profesionales_upd BEFORE UPDATE ON public.profesionales FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();

CREATE TABLE public.profesional_sucursal (
    profesional_id UUID REFERENCES public.profesionales(id) ON DELETE CASCADE,
    sucursal_id UUID REFERENCES public.sucursales(id) ON DELETE CASCADE,
    PRIMARY KEY (profesional_id, sucursal_id)
);
ALTER TABLE public.profesional_sucursal ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.servicios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    negocio_id UUID REFERENCES public.negocios(id) NOT NULL,
    nombre TEXT NOT NULL,
    duracion_minutos INTEGER NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.servicios ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tr_servicios_upd BEFORE UPDATE ON public.servicios FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();

-- 6. RULES: HORARIOS & BLOQUEOS
CREATE TABLE public.horarios_atencion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profesional_id UUID REFERENCES public.profesionales(id) ON DELETE CASCADE,
    sucursal_id UUID REFERENCES public.sucursales(id) ON DELETE CASCADE,
    dia_semana INTEGER CHECK (dia_semana BETWEEN 0 AND 6),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    min_i INTEGER GENERATED ALWAYS AS (EXTRACT(HOUR FROM hora_inicio) * 60 + EXTRACT(MINUTE FROM hora_inicio)) STORED,
    min_f INTEGER GENERATED ALWAYS AS (EXTRACT(HOUR FROM hora_fin) * 60 + EXTRACT(MINUTE FROM hora_fin)) STORED,
    CONSTRAINT no_overlap_h EXCLUDE USING gist (profesional_id WITH =, sucursal_id WITH =, dia_semana WITH =, int4range(min_i, min_f) WITH &&)
);
ALTER TABLE public.horarios_atencion ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.bloqueos_agenda (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    negocio_id UUID REFERENCES public.negocios(id) NOT NULL,
    sucursal_id UUID REFERENCES public.sucursales(id) NOT NULL,
    profesional_id UUID REFERENCES public.profesionales(id) ON DELETE CASCADE,
    fecha_hora_inicio TIMESTAMPTZ NOT NULL,
    fecha_hora_fin TIMESTAMPTZ NOT NULL,
    motivo TEXT
);
ALTER TABLE public.bloqueos_agenda ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_bloqueos_gist ON public.bloqueos_agenda USING GIST (profesional_id, tstzrange(fecha_hora_inicio, fecha_hora_fin));

-- 7. CLIENTS
CREATE TABLE public.clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    negocio_id UUID REFERENCES public.negocios(id) NOT NULL,
    wa_id TEXT NOT NULL, 
    nombre TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(negocio_id, wa_id)
);
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tr_clientes_upd BEFORE UPDATE ON public.clientes FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();

-- 8. BOOKINGS: CITAS
CREATE TABLE public.citas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    negocio_id UUID REFERENCES public.negocios(id) NOT NULL,
    sucursal_id UUID REFERENCES public.sucursales(id) NOT NULL,
    cliente_id UUID REFERENCES public.clientes(id) NOT NULL,
    profesional_id UUID REFERENCES public.profesionales(id) NOT NULL,
    servicio_id UUID REFERENCES public.servicios(id) NOT NULL,
    fecha_hora_inicio TIMESTAMPTZ NOT NULL,
    fecha_hora_fin TIMESTAMPTZ NOT NULL,
    precio_final DECIMAL(10,2) NOT NULL,
    estado public.estado_cita DEFAULT 'PENDIENTE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT no_overlap_c EXCLUDE USING gist (profesional_id WITH =, tstzrange(fecha_hora_inicio, fecha_hora_fin) WITH &&) WHERE (estado != 'CANCELADA')
);
ALTER TABLE public.citas ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tr_citas_upd BEFORE UPDATE ON public.citas FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();

-- 9. TRIGGERS: INTEGRIDAD TOTAL
CREATE OR REPLACE FUNCTION public.fn_validate_appointment_integrity()
RETURNS TRIGGER AS $$
DECLARE v_dur INT;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profesionales WHERE id = NEW.profesional_id AND negocio_id = NEW.negocio_id) THEN RAISE EXCEPTION 'Profesional no pertenece al negocio.'; END IF;
  IF NOT EXISTS (SELECT 1 FROM servicios WHERE id = NEW.servicio_id AND negocio_id = NEW.negocio_id) THEN RAISE EXCEPTION 'Servicio no pertenece al negocio.'; END IF;
  IF NOT EXISTS (SELECT 1 FROM clientes WHERE id = NEW.cliente_id AND negocio_id = NEW.negocio_id) THEN RAISE EXCEPTION 'Cliente no pertenece al negocio.'; END IF;
  IF NOT EXISTS (SELECT 1 FROM sucursales WHERE id = NEW.sucursal_id AND negocio_id = NEW.negocio_id) THEN RAISE EXCEPTION 'Sucursal no pertenece al negocio.'; END IF;
  SELECT duracion_minutos INTO v_dur FROM servicios WHERE id = NEW.servicio_id;
  IF EXTRACT(EPOCH FROM (NEW.fecha_hora_fin - NEW.fecha_hora_inicio)) / 60 != v_dur THEN RAISE EXCEPTION 'Duración incorrecta.'; END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER tr_citas_integrity BEFORE INSERT OR UPDATE ON public.citas FOR EACH ROW EXECUTE FUNCTION public.fn_validate_appointment_integrity();

-- 10. MESSAGING
CREATE TABLE public.mensajeria_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    negocio_id UUID REFERENCES public.negocios(id) NOT NULL,
    cliente_id UUID REFERENCES public.clientes(id),
    tipo_mensaje public.tipo_mensaje NOT NULL,
    estado public.estado_mensaje DEFAULT 'PENDIENTE',
    prioridad INTEGER DEFAULT 5,
    intentos INTEGER DEFAULT 0,
    fecha_programada TIMESTAMPTZ NOT NULL,
    unique_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(negocio_id, unique_hash)
);
ALTER TABLE public.mensajeria_queue ENABLE ROW LEVEL SECURITY;

-- 11. CEREBRO: DISPONIBILIDAD
CREATE OR REPLACE FUNCTION public.obtener_disponibilidad(p_sucursal_id UUID, p_servicio_id UUID, p_fecha DATE, p_profesional_id UUID DEFAULT NULL)
RETURNS TABLE (id_p UUID, nombre_p TEXT, h_i TIMESTAMPTZ, h_f TIMESTAMPTZ) AS $$
DECLARE v_dur INT; v_dow INT;
BEGIN
    SELECT duracion_minutos INTO v_dur FROM public.servicios WHERE id = p_servicio_id;
    v_dow := EXTRACT(DOW FROM p_fecha);
    RETURN QUERY
    WITH slots AS (
        SELECT ps.profesional_id as pid, p.nombre as pnom, h.hora_fin as turn_end, s.timezone as tz,
        ((p_fecha::timestamp + h.hora_inicio) AT TIME ZONE s.timezone) + (n * interval '15 minutes') as si,
        ((p_fecha::timestamp + h.hora_inicio) AT TIME ZONE s.timezone) + (n * interval '15 minutes') + (v_dur * interval '1 minute') as sf
        FROM public.horarios_atencion h
        JOIN public.profesionales p ON p.id = h.profesional_id
        JOIN public.sucursales s ON s.id = h.sucursal_id
        JOIN public.profesional_sucursal ps ON ps.profesional_id = h.profesional_id AND ps.sucursal_id = h.sucursal_id
        CROSS JOIN generate_series(0, (EXTRACT(EPOCH FROM (h.hora_fin - h.hora_inicio)) / 900)::int) AS n
        WHERE h.sucursal_id = p_sucursal_id AND h.dia_semana = v_dow AND (p_profesional_id IS NULL OR h.profesional_id = p_profesional_id) AND p.activo = true
    )
    SELECT pid, pnom, si, sf FROM slots s
    WHERE s.sf <= ((p_fecha::timestamp + s.turn_end) AT TIME ZONE s.tz)
      AND NOT EXISTS (SELECT 1 FROM public.citas c WHERE c.profesional_id = s.pid AND c.estado != 'CANCELADA' AND tstzrange(c.fecha_hora_inicio, c.fecha_hora_fin) && tstzrange(s.si, s.sf))
      AND NOT EXISTS (SELECT 1 FROM public.bloqueos_agenda b WHERE b.profesional_id = s.pid AND tstzrange(b.fecha_hora_inicio, b.fecha_hora_fin) && tstzrange(s.si, s.sf));
END;
$$ LANGUAGE plpgsql STABLE;

-- 12. RLS POLICIES (ALL TABLES)
CREATE POLICY p_negocios ON public.negocios FOR ALL TO authenticated USING (owner_id = auth.uid());
CREATE POLICY p_modulos ON public.negocio_modulos FOR ALL TO authenticated USING (negocio_id IN (SELECT id FROM negocios));
CREATE POLICY p_sucursales ON public.sucursales FOR ALL TO authenticated USING (negocio_id IN (SELECT id FROM negocios));
CREATE POLICY p_profesionales ON public.profesionales FOR ALL TO authenticated USING (negocio_id IN (SELECT id FROM negocios));
CREATE POLICY p_prof_suc ON public.profesional_sucursal FOR ALL TO authenticated USING (profesional_id IN (SELECT id FROM profesionales));
CREATE POLICY p_servicios ON public.servicios FOR ALL TO authenticated USING (negocio_id IN (SELECT id FROM negocios));
CREATE POLICY p_horarios ON public.horarios_atencion FOR ALL TO authenticated USING (profesional_id IN (SELECT id FROM profesionales));
CREATE POLICY p_bloqueos ON public.bloqueos_agenda FOR ALL TO authenticated USING (negocio_id IN (SELECT id FROM negocios));
CREATE POLICY p_clientes ON public.clientes FOR ALL TO authenticated USING (negocio_id IN (SELECT id FROM negocios));
CREATE POLICY p_citas ON public.citas FOR ALL TO authenticated USING (negocio_id IN (SELECT id FROM negocios));
CREATE POLICY p_queue ON public.mensajeria_queue FOR ALL TO authenticated USING (negocio_id IN (SELECT id FROM negocios));

-- 13. AUTH & INIT TRIGGERS
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN INSERT INTO public.usuarios (id, nombre, email, rol) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Owner'), NEW.email, 'OWNER'); RETURN NEW; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER tr_auth_signup AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_business() RETURNS TRIGGER AS $$
BEGIN INSERT INTO public.negocio_modulos (negocio_id) VALUES (NEW.id); RETURN NEW; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER tr_init_biz AFTER INSERT ON public.negocios FOR EACH ROW EXECUTE FUNCTION public.handle_new_business();

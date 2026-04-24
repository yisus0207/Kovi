"use client"

import { useEffect } from 'react'

export default function ScrollObserver() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, 50)
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const observeElements = () => {
      document.querySelectorAll('.fade-up:not(.visible)').forEach(el => observer.observe(el))
    }

    observeElements()

    const mutationObserver = new MutationObserver((mutations) => {
      let shouldUpdate = false
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) shouldUpdate = true
      })
      if (shouldUpdate) observeElements()
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}

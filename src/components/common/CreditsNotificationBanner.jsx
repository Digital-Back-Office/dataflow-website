import { useState, useEffect } from 'react'

export default function CreditsNotificationBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showStrip, setShowStrip] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateViewport = () => setIsMobile(mediaQuery.matches)

    updateViewport()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateViewport)
      return () => mediaQuery.removeEventListener('change', updateViewport)
    }

    mediaQuery.addListener(updateViewport)
    return () => mediaQuery.removeListener(updateViewport)
  }, [])

  useEffect(() => {
    // Check if user has already closed the banner in this session
    const bannerClosed = sessionStorage.getItem('creditsBannerClosed')
    const stripBannerClosed = sessionStorage.getItem('creditsStripBannerClosed')
    const inCampaignPage = window.location.pathname.includes('/free-credits')

    // Don't show banner if user is on the campaign page
    if (inCampaignPage) {
      return
    }
    
    if (!bannerClosed) {
      // Show banner after 10 seconds
      const timer = setTimeout(() => {
        if (window.matchMedia('(max-width: 767px)').matches) {
          // Mobile: avoid large overlay and show only compact strip.
          setShowStrip(true)
        } else {
          setShowBanner(true)
          setTimeout(() => setIsVisible(true), 100)
        }
      }, 10000)

      return () => clearTimeout(timer)
    } else {
      // If banner was closed, show the strip
      if (!stripBannerClosed) {
        setShowStrip(true)
      } else {
        setShowStrip(false)
      }
    }
  }, [])

  // Add/remove body class for header offset whenever strip is visible.
  useEffect(() => {
    if (showStrip) {
      document.body.classList.add('has-notification-strip')
    } else {
      document.body.classList.remove('has-notification-strip')
    }
    return () => {
      document.body.classList.remove('has-notification-strip')
    }
  }, [showStrip])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      setShowBanner(false)
      // Mobile should never show the slide-in banner fallback.
      setShowStrip(true)
      sessionStorage.setItem('creditsBannerClosed', 'true')
    }, 300) // Wait for slide-out animation
  }

  const handleStripClose = () => {
    setShowStrip(false)
    sessionStorage.setItem('creditsBannerClosed', 'true')
    sessionStorage.setItem('creditsStripBannerClosed', 'true')
  }

  if (!showBanner && !showStrip) return null

  return (
    <>
      {/* Top Strip Notification */}
      {showStrip && (
        <div className='fixed top-0 text-center left-0 right-0 z-[60] bg-gradient-to-r from-primary to-secondary text-white px-3 py-2'>
          <style>{
            `body.has-notification-strip header { top: 35px !important; }`
          }</style>
          <div className='max-w-7xl mx-auto flex items-center justify-between gap-3'>
            <div className='flex items-center gap-4 flex-1'>
              <a
                href='/free-credits'
                className='text-xs md:text-sm font-medium hover:underline flex-1'
              >
                {isMobile
                  ? '🎉 Free credits up to $1000. Apply now →'
                  : '🎉 Get upto $1000 Free Dataflow Credits! Limited spots available. Apply now →'}
              </a>
            </div>
            <button
              onClick={handleStripClose}
              className='text-white hover:text-gray-200 transition-colors flex-shrink-0'
              aria-label='Close notification'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Slide-in Banner from Top Right */}
      {showBanner && !isMobile && (
        <div
          className={`fixed top-24 right-4 z-50 w-full max-w-md transition-all duration-300 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <div className='bg-white rounded-2xl'>
            <div className='bg-gradient-to-br from-primary/10 via-white to-secondary/10 rounded-2xl shadow-xl border border-primary/20 overflow-hidden'>
            {/* Close Button */}
            <button
              onClick={handleClose}
              className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10'
              aria-label='Close banner'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>

            {/* Banner Content */}
            <a href='/free-credits' className='block'>
              <div className=' p-6 pr-12'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg'>
                    <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-lg font-bold text-textDarker mb-1'>
                      Get upto $1000 Free Credits! 🎉
                    </h3>
                    <p className='text-sm text-textPrimary/80 mb-3'>
                      Limited spots available for our Dataflow Free Credits Program. Perfect for Startups and Indie developers!
                    </p>
                    <div className='flex items-center gap-2'>
                      <span className='inline-flex items-center gap-1 text-sm font-semibold text-primary'>
                        Apply Now
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Progress Indicator */}
            <div className='px-6 py-2 flex items-center justify-between text-xs text-textPrimary/60'>
              <span>🔥 Hurry! Limited spots</span>
              <span className='font-semibold text-primary'>Free Credits</span>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  )
}

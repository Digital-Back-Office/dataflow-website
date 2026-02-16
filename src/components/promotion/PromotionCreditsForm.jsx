import { useState } from 'react'

const FORM_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeGjuyA_jjDmmT4jTY96s0CgCL_JKOJlNrTRqJ-9iqRmlEPKw/formResponse'

const initialState = {
  name: '',
  email: '',
  country: '',
  role: 'Student',
  experience: 'Beginner',
  profile: ''
}

export default function PromotionCreditsForm() {
  const [formState, setFormState] = useState(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('entry.1291198894', formState.name)
    formData.append('entry.59580764', formState.email)
    formData.append('entry.1637227755', formState.country)
    formData.append('entry.1061557718', formState.role)
    formData.append('entry.154861476', formState.experience)
    formData.append('entry.1056515558', formState.profile)

    try {
      await fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      setIsSubmitted(true)
      setFormState(initialState)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className='rounded-3xl border border-primary/10 bg-white p-10 text-center shadow-lg'>
        <div className='mx-auto mb-6 size-16 rounded-2xl bg-primary/10 flex items-center justify-center'>
          <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
          </svg>
        </div>
        <h3 className='text-2xl font-bold text-textDarker mb-2'>Application received!</h3>
        <p className='text-textPrimary/80'>We will reach out through mail for further steps.</p>
      </div>
    )
  }

  return (
    <form
      className='bg-white rounded-3xl border border-primary/10 shadow-lg overflow-hidden'
      onSubmit={handleSubmit}
    >
      <div className='p-8 space-y-6'>
        <div className='grid sm:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>Full Name</label>
            <input
              type='text'
              required
              name='name'
              value={formState.name}
              onChange={handleChange}
              placeholder='Your name'
              className='w-full h-12 rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 focus:outline-none focus:ring-2 focus:ring-primary/30'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>Email Address</label>
            <input
              type='email'
              required
              name='email'
              value={formState.email}
              onChange={handleChange}
              placeholder='you@email.com'
              className='w-full h-12 rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 focus:outline-none focus:ring-2 focus:ring-primary/30'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>Country</label>
            <input
              type='text'
              required
              name='country'
              value={formState.country}
              onChange={handleChange}
              placeholder='Country'
              className='w-full h-12 rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 focus:outline-none focus:ring-2 focus:ring-primary/30'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>Role</label>
            <select
              name='role'
              value={formState.role}
              onChange={handleChange}
              className='w-full h-12 rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 focus:outline-none focus:ring-2 focus:ring-primary/30'
            >
              <option>Student</option>
              <option>Developer</option>
              <option>Researcher</option>
              <option>Founder</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div className='grid sm:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>Experience Level</label>
            <select
              name='experience'
              value={formState.experience}
              onChange={handleChange}
              className='w-full h-12 rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 focus:outline-none focus:ring-2 focus:ring-primary/30'
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>GitHub / Portfolio / LinkedIn (Optional)</label>
            <input
              type='text'
              name='profile'
              value={formState.profile}
              onChange={handleChange}
              placeholder='Link'
              className='w-full h-12 rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 focus:outline-none focus:ring-2 focus:ring-primary/30'
            />
          </div>
        </div>
        <button
          type='submit'
          className='w-full h-12 rounded-2xl bg-primary text-white font-semibold shadow-md hover:bg-primaryHover transition disabled:opacity-70'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  )
}

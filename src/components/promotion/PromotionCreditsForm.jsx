import { useState } from 'react'

const STEP_1_FORM_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdWPnD6lL0ioBkqVDl5k-JswIjhup8Y-dJGmbh1NCS5O7WI-g/formResponse'

const STEP_2_FORM_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdfMNSnUVGFnmV_1izrtxnOyuamPeU1iOhd1GWD3pxJEpphVQ/formResponse'

const initialState = {
  name: '',
  email: '',
  country: '',
  role: 'Founder',
  organization: '',
  experience: 'Intermediate',
  profile: '',
  problemStatement: '',
  projectDescription: '',
  additionalInfo: ''
}

export default function PromotionCreditsForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formState, setFormState] = useState(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (errorMessage) {
      setErrorMessage('')
    }
  }

    const isCompanyAddress = (email) => {
      const personalEmailDomains = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com', '@aol.com', '@icloud.com', '@protonmail.com']
      return typeof email === 'string' && personalEmailDomains.some(domain => email.trim().toLowerCase().endsWith(domain))
    }

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

  const isValidProfileUrl = (value) => {
    if (!value) return true
    try {
      const url = new URL(value)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleStep1Submit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (isSubmitting) return

    const trimmedState = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      country: formState.country.trim(),
      role: formState.role.trim(),
      organization: formState.organization.trim(),
      experience: formState.experience.trim(),
      profile: formState.profile.trim()
    }

    if (!trimmedState.name || !trimmedState.email || !trimmedState.country || !trimmedState.organization) {
      setErrorMessage('Please fill in all required fields.')
      return
    }

    if (!isValidEmail(trimmedState.email)) {
      setErrorMessage('Please provide a valid email address.')
      return
    }

    if (isCompanyAddress(trimmedState.email)) {
      setErrorMessage('Please use your company email address.')
      return
    }

    if (!isValidProfileUrl(trimmedState.profile)) {
      setErrorMessage('Please provide a valid profile link (including http:// or https://).')
      return
    }

    submitStep1Async(trimmedState)
  }

  const submitStep1Async = async (trimmedState) => {
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('entry.1852241509', trimmedState.name)
    formData.append('entry.122816342', trimmedState.email)
    formData.append('entry.100011517', trimmedState.role)
    formData.append('entry.357335691', trimmedState.country)
    formData.append('entry.328211722', trimmedState.experience)
    formData.append('entry.1482642695', trimmedState.profile)
    formData.append('entry.1930777370', trimmedState.organization)

    try {
      await fetch(STEP_1_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      setErrorMessage('')
      setCurrentStep(2)
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStep2Submit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (isSubmitting) return

    const trimmedState = {
      problemStatement: formState.problemStatement.trim(),
      projectDescription: formState.projectDescription.trim(),
      additionalInfo: formState.additionalInfo.trim()
    }

    if (!trimmedState.problemStatement || !trimmedState.projectDescription) {
      setErrorMessage('Please fill in all required fields.')
      return
    }

    submitStep2Async(trimmedState)
  }

  const submitStep2Async = async (trimmedState) => {
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('entry.2021533200', formState.email)
    formData.append('entry.903342397', trimmedState.problemStatement)
    formData.append('entry.2069580431', trimmedState.projectDescription)
    formData.append('entry.1708244109', trimmedState.additionalInfo)

    try {
      await fetch(STEP_2_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      setIsSubmitted(true)
      setFormState(initialState)
      setErrorMessage('')
      setCurrentStep(1)
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.')
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

  if (currentStep === 2) {
    return (
      <form
        className='bg-white rounded-3xl border border-primary/10 shadow-lg overflow-hidden'
        onSubmit={handleStep2Submit}
      >
        <div className='p-8 space-y-6'>
          <div className='mb-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-semibold text-primary'>Step 2 of 2</span>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>
              Problem Statement <span className='text-red-500'>*</span>
            </label>
            <textarea
              required
              name='problemStatement'
              value={formState.problemStatement}
              onChange={handleChange}
              placeholder='Describe the problem you are trying to solve'
              rows={4}
              className='w-full rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>
              Project Description <span className='text-red-500'>*</span>
            </label>
            <textarea
              required
              name='projectDescription'
              value={formState.projectDescription}
              onChange={handleChange}
              placeholder='Tell us about your project and how you plan to use Dataflow'
              rows={5}
              className='w-full rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>Additional Information (Optional)</label>
            <textarea
              name='additionalInfo'
              value={formState.additionalInfo}
              onChange={handleChange}
              placeholder='Any other information you would like to share'
              rows={3}
              className='w-full rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none'
            />
          </div>

          <button
            type='submit'
            className='w-full h-12 rounded-2xl bg-primary text-white font-semibold shadow-md hover:bg-primaryHover transition disabled:opacity-70'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          {errorMessage && <p className='text-sm text-red-600 text-center'>{errorMessage}</p>}
        </div>
      </form>
    )
  }

  return (
    <form
      className='bg-white rounded-3xl border border-primary/10 shadow-lg overflow-hidden'
      onSubmit={handleStep1Submit}
    >
      <div className='p-8 space-y-6'>
        <div className='mb-4'>
          <span className='text-sm font-semibold text-primary'>Step 1 of 2</span>
        </div>
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
              placeholder='name@company.com'
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
              <option>Founder</option>
              <option>Student</option>
              <option>Developer</option>
              <option>Researcher</option>
              <option>Other</option>
            </select>
          </div>
        </div>
         <div className='space-y-2'>
            <label className='text-sm font-semibold text-textPrimary'>Organization</label>
            <input
              type='text'
              required
              name='organization'
              value={formState.organization}
              onChange={handleChange}
              placeholder='Name of your organization'
              className='w-full h-12 rounded-2xl border border-gray-200 bg-[#f7fbfb] px-4 focus:outline-none focus:ring-2 focus:ring-primary/30'
            />
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
          {isSubmitting ? 'Continuing...' : 'Continue'}
        </button>
        {errorMessage && <p className='text-sm text-red-600 text-center'>{errorMessage}</p>}
      </div>
    </form>
  )
}

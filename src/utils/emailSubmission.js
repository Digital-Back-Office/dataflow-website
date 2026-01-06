const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',
  emailEntryId: 'entry.YOUR_ENTRY_ID', // Replace with your actual entry ID for email field
  pageSourceEntryId: 'entry.YOUR_PAGE_SOURCE_ENTRY_ID' // Replace with your actual entry ID for page source field
}

// Redirect URL configuration
const REDIRECT_CONFIG = {
  baseUrl: 'https://app.dataflow.zone/hub/login',
  emailParam: 'email'
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function submitToGoogleForm(email, pageSource) {
  try {
    const formData = new FormData()
    formData.append(GOOGLE_FORM_CONFIG.emailEntryId, email)
    formData.append(GOOGLE_FORM_CONFIG.pageSourceEntryId, pageSource)
    
    await fetch(GOOGLE_FORM_CONFIG.formUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    
    return true
  } catch (error) {
    console.log('Form submission error:', error)
    return false
  }
}


function redirectToApp(email) {
  const url = new URL(REDIRECT_CONFIG.baseUrl)
  url.searchParams.set(REDIRECT_CONFIG.emailParam, email)
  window.location.href = url.toString()
}


export async function handleEmailSubmit(email, pageSource = 'unknown') {
  const trimmedEmail = email.trim()
  
  // Validate email
  if (!validateEmail(trimmedEmail)) {
    console.error('Invalid email format')
    return
  }
  
  // Submit to Google Form (non-blocking)
  await submitToGoogleForm(trimmedEmail, pageSource)
  
  // Redirect to app
  redirectToApp(trimmedEmail)
}

export function setupEmailForm(formId, emailInputId, pageSource = 'unknown') {
  const form = document.getElementById(formId)
  const emailInput = document.getElementById(emailInputId)
  
  if (form && emailInput) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      await handleEmailSubmit(emailInput.value, pageSource)
    })
  }
}

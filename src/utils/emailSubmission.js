const formId = '1FAIpQLScm9m5YZa0bdolEh1Sk3siQZgC2scoDnjc7gYk7xodB3WP2Vw';

const GOOGLE_FORM_CONFIG = {
  formUrl: `https://docs.google.com/forms/d/e/${formId}/formResponse`,
  emailEntryId: 'entry.1103074482',
  pageSourceEntryId: 'entry.1402974516'
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
  window.open(url.toString(), '_blank')
}


export async function handleEmailSubmit(email, pageSource = 'unknown', shouldRedirect = true, customHref = '') {
  const trimmedEmail = email.trim()
  
  // Validate email
  if (!validateEmail(trimmedEmail)) {
    console.error('Invalid email format')
    return
  }
  
  // Submit to Google Form (non-blocking)
  await submitToGoogleForm(trimmedEmail, pageSource)
  
  // Redirect based on shouldRedirect flag
  if (shouldRedirect) {
    redirectToApp(trimmedEmail)
  } else if (customHref) {
    window.location.href = customHref
  }
}

export function setupEmailForm(formId, emailInputId, pageSource = 'unknown', shouldRedirect = true, customHref = '') {
  const form = document.getElementById(formId)
  const emailInput = document.getElementById(emailInputId)
  
  if (form && emailInput) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      await handleEmailSubmit(emailInput.value, pageSource, shouldRedirect, customHref)
    })
  }

}

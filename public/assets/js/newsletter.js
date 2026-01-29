// Newsletter form submission to Google Forms
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form[name="newsletter"]');
  if (!form) return;

  // Google Form configuration
  const GOOGLE_FORM_ID = '1thOVJF3LLZCkuUvHPQWkqB4aFkx_SYf8k0CE4fxRxGo';
  const FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
 
  const FIELD_MAPPINGS = {
    email: 'entry.1368199060', 
    'advertising-updates': 'entry.1542317881',
    'daily-newsletter': 'entry.1153069819',
    'week-in-review': 'entry.1828214889',
  };

  // Subscription options configuration
  const subscriptionOptions = [
    {
      id: 'advertising-updates',
      name: 'advertising-updates',
      label: 'Product Updates',
      checked: true,
    },
    {
      id: 'daily-newsletter',
      name: 'daily-newsletter',
      label: 'Weekly Digest',
      checked: false,
    },
    {
      id: 'week-in-review',
      name: 'week-in-review',
      label: 'Tips & Tutorials',
      checked: false,
    },
  ];

  // Trust indicators configuration
  const trustIndicators = [
    {
      icon: 'M2.166 4.999A11.954 11.954 0 0110 1.944 11.954 11.954 0 0117.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
      text: 'No spam, ever',
    },
    {
      icon: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0116 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z',
      text: 'Unsubscribe anytime',
    },
  ];

  // Small toast helper for non-blocking feedback
  function showToast(message, duration = 3000) {
    let container = document.getElementById('newsletter-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'newsletter-toast-container';
      Object.assign(container.style, {
        position: 'fixed',
        right: '20px',
        top: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      });
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    Object.assign(toast.style, {
      background: '#111827',
      color: '#ffffff',
      padding: '10px 14px',
      borderRadius: '10px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
      opacity: '0',
      transform: 'translateY(8px)',
      transition: 'opacity 260ms ease, transform 260ms ease',
      maxWidth: '320px',
      pointerEvents: 'auto',
      fontSize: '14px',
    });
    toast.textContent = message;
    container.appendChild(toast);

    // trigger animation
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    // remove
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => {
        toast.remove();
        if (container && container.children.length === 0) container.remove();
      }, 260);
    }, duration);

    return toast;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = form.querySelector('input[name="email"]');
    const email = emailInput ? emailInput.value : '';

    if (!email) {
      alert('Please enter your email address');
      return;
    }

    // Build form data
    const formData = new FormData();
    formData.append(FIELD_MAPPINGS.email, email);

    // Add checked subscription options
    subscriptionOptions.forEach((option) => {
      const checkbox = form.querySelector(`input[name="${option.name}"]`);
      if (checkbox && checkbox.checked && FIELD_MAPPINGS[option.name]) {
        formData.append(FIELD_MAPPINGS[option.name], 'on');
      }
    });

    // Submit to Google Forms using fetch with no-cors mode
    fetch(FORM_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    })
      .then(() => {
        // Reset form
        form.reset();
        // Show success toast
        showToast('Thank you for subscribing!');
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        showToast('There was an error submitting the form. Please try again.');
      });
  });

  // Export subscription options and trust indicators for use in component if needed
  window.newsletterConfig = {
    subscriptionOptions,
    trustIndicators,
  };
});

# n8n Webhook Integration Guide

## Overview
This guide documents the standard pattern for integrating web forms with n8n webhooks across ACME Marketing projects. This approach provides a consistent, reliable method for handling form submissions without requiring server-side processing.

## n8n Webhook URL Structure

### Standard Format
```
https://n8n.srv874889.hstgr.cloud/webhook/[WEBHOOK_ID]
```

### Test Format (for development)
```
https://n8n.srv874889.hstgr.cloud/webhook-test/[WEBHOOK_ID]
```

**Note**: The webhook URL structure may vary between production (`/webhook/`) and test (`/webhook-test/`) endpoints.

## Implementation Pattern

### 1. HTML Form Setup

Remove traditional form submission attributes and add JavaScript handler:

```html
<!-- Before: Traditional form -->
<form method="POST" action="/api/contact">

<!-- After: JavaScript-handled form -->
<form onsubmit="handleFormSubmit(event)">
```

### 2. JavaScript Implementation

```javascript
<script>
document.addEventListener('DOMContentLoaded', function() {
    async function handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        
        // Extract form data into JSON object
        const submissionData = {
            field1: formData.get('field1') as string,
            field2: formData.get('field2') as string,
            // Add all form fields here
        };
        
        // Client-side validation
        if (!submissionData.field1 || !submissionData.field2) {
            alert('Please fill in all required fields.');
            return;
        }
        
        try {
            const response = await fetch('https://n8n.srv874889.hstgr.cloud/webhook/[WEBHOOK_ID]', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });
            
            if (response.ok) {
                alert('Thank you! Your submission has been received.');
                form.reset(); // Clear form
            } else {
                alert('There was an error submitting the form. Please try again.');
                console.error('Form submission failed:', response.status, await response.text());
            }
        } catch (error) {
            alert('Network error. Please check your connection and try again.');
            console.error('Form submission network error:', error);
        }
    }

    // Make function available globally
    (window as any).handleFormSubmit = handleFormSubmit;
});
</script>
```

## Real-World Examples

### Contact Form (BAM Team Services)
```javascript
const contactData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    company: formData.get('company') as string,
    notes: formData.get('notes') as string
};

// URL: https://n8n.srv874889.hstgr.cloud/webhook/d4337759-71ae-4cf6-8cac-5b15b8b6c57c
```

### Newsletter Signup (Disendarkenment)
```javascript
const newsletterData = {
    email: emailInput?.value
};

// URL: https://n8n.srv874889.hstgr.cloud/webhook/3987a953-945d-46d4-ab0e-87c9edb56a61
```

## Key Implementation Details

### HTTP Request Specifications
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**: JSON stringified object containing form data
- **Error Handling**: Handle both HTTP errors and network exceptions

### Form Data Processing
1. **Use FormData API**: Extract data from form elements
2. **Type Casting**: Cast form values to appropriate types (usually string)
3. **Validation**: Perform client-side validation before submission
4. **Sanitization**: Ensure data is clean (n8n handles server-side processing)

### User Experience Patterns
- **Prevent Default**: Always call `event.preventDefault()` to stop traditional form submission
- **Loading States**: Consider adding loading indicators for longer processes
- **Success Feedback**: Clear success messages with form reset
- **Error Handling**: Informative error messages with console logging for debugging
- **Form Reset**: Clear form fields after successful submission

## Error Handling Strategy

### HTTP Response Errors
```javascript
if (response.ok) {
    // Success handling
} else {
    // Log detailed error information
    console.error('Form submission failed:', response.status, await response.text());
    // Show user-friendly message
    alert('There was an error submitting the form. Please try again.');
}
```

### Network Errors
```javascript
catch (error) {
    console.error('Form submission network error:', error);
    alert('Network error. Please check your connection and try again.');
}
```

## Astro-Specific Considerations

### TypeScript Support
When using TypeScript in Astro projects:
- Cast form elements: `event.target as HTMLFormElement`
- Cast form data: `formData.get('field') as string`
- Cast window object: `(window as any).functionName`

### Script Placement
- Place `<script>` tags at the end of the `.astro` file
- Use `DOMContentLoaded` event listener to ensure DOM is ready
- Make functions globally available for inline event handlers

## Validation Patterns

### Client-Side Validation
```javascript
// Simple required field validation
if (!data.field1 || !data.field2) {
    alert('Please fill in all required fields.');
    return;
}

// Email validation (basic)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(data.email)) {
    alert('Please enter a valid email address.');
    return;
}
```

### Server-Side Processing
- n8n handles server-side validation and processing
- Form data is automatically available in n8n workflow
- Configure n8n workflows to handle data transformation, validation, and routing

## Security Considerations

### Client-Side Security
- **No Sensitive Logic**: Keep authentication and sensitive processing server-side in n8n
- **Input Sanitization**: Basic sanitization, but rely on n8n for comprehensive validation
- **HTTPS Only**: Always use HTTPS URLs for webhook endpoints

### n8n Webhook Security
- **Webhook IDs**: Treat webhook IDs as sensitive - don't expose in public repositories
- **Access Control**: Configure n8n authentication and access controls appropriately
- **Rate Limiting**: Consider implementing rate limiting in n8n workflows

## Debugging Tips

### Browser Developer Tools
- **Network Tab**: Monitor HTTP requests and responses
- **Console Tab**: Check for JavaScript errors and custom log messages
- **Application Tab**: Verify form data extraction

### n8n Debugging
- **Test Webhooks**: Use `/webhook-test/` endpoints during development
- **Execution Logs**: Check n8n execution history for failed webhooks
- **Manual Testing**: Test webhook endpoints directly with tools like Postman

## Best Practices

### Code Organization
1. **Consistent Naming**: Use descriptive function names (`handleContactSubmit`, `handleNewsletterSignup`)
2. **Error Logging**: Always log detailed errors to console
3. **User Feedback**: Provide clear, actionable feedback messages
4. **Form Reset**: Reset forms after successful submission

### Maintenance
1. **Documentation**: Document webhook IDs and their purposes
2. **Testing**: Test form submissions regularly
3. **Monitoring**: Monitor n8n webhook execution logs
4. **Backup**: Maintain backup webhook endpoints for critical forms

## Template Code

### Basic Form Handler Template
```javascript
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = {
        // Map your form fields here
    };
    
    // Add validation here
    
    try {
        const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        if (response.ok) {
            alert('Success message');
            form.reset();
        } else {
            alert('Error message');
            console.error('Submission failed:', response.status, await response.text());
        }
    } catch (error) {
        alert('Network error message');
        console.error('Network error:', error);
    }
}
```

## Conclusion

This n8n integration pattern provides a robust, scalable solution for handling form submissions across web applications. By following these conventions, you can ensure consistent behavior, proper error handling, and maintainable code across all ACME Marketing projects.

The pattern eliminates the need for custom server-side endpoints while providing full control over data processing through n8n workflows. This approach is particularly effective for static sites (like those built with Astro) that need dynamic form handling capabilities.
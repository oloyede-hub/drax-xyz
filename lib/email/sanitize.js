import sanitizeHtml from 'sanitize-html';

export function sanitize(input) {
  if (typeof input !== 'string') input = String(input || '');
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });
}

export function safeJsonStringifyForHtml(obj) {
  try {
    const str = JSON.stringify(obj, null, 2);
    return sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} })
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  } catch (e) {
    return '';
  }
}

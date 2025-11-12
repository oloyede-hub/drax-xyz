'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({ children }) {
  const [styledComponentsStyleSheet] = useState(() => {
    // Create ServerStyleSheet only on server
    // On client, this will be undefined
    if (typeof window === 'undefined') {
      return new ServerStyleSheet()
    }
    return undefined
  })

  useServerInsertedHTML(() => {
    if (styledComponentsStyleSheet) {
      const styles = styledComponentsStyleSheet.getStyleElement()
      styledComponentsStyleSheet.instance.clearTag()
      return <>{styles}</>
    }
    return null
  })

  // Always render the same structure
  // On server: StyleSheetManager with sheet collects styles
  // On client: StyleSheetManager without sheet works normally (styled-components handles it)
  if (styledComponentsStyleSheet) {
    return (
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
      </StyleSheetManager>
    )
  }

  // On client after hydration, just render children
  // styled-components will handle styles automatically
  return <>{children}</>
}
import React,{ useEffect } from "react";

/**
 * Custom hook to update the document title on page/component change.
 * @param {string} title - The title to set for the document.
 */
export default function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}

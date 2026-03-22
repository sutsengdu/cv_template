import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const exportToPDF = async (elementId, filename, format = 'a4') => {
  const element = document.getElementById(elementId)
  if (!element) return

  // Width in pixels (96dpi) for various formats
  const formatWidths = {
    'a3': 1123,
    'a4': 794,
    'a5': 559,
    'letter': 816,
    'legal': 816,
    'tabloid': 1056
  }
  const captureWidth = formatWidths[format.toLowerCase()] || 794

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    letterRendering: false,
    logging: false,
    width: captureWidth,
    windowWidth: captureWidth,
    onclone: (clonedDoc) => {
      const clonedElement = clonedDoc.getElementById(elementId)
      if (clonedElement) {
        // Clear transforms and constraints on all parents so html2canvas renders at 1:1 scale
        let parent = clonedElement.parentElement;
        while (parent && parent !== clonedDoc.body) {
          parent.style.transform = 'none';
          parent.style.width = 'auto';
          parent.style.minWidth = 'auto';
          parent.style.height = 'auto';
          parent.style.overflow = 'visible';
          parent.style.position = 'static';
          parent.style.margin = '0';
          parent.style.padding = '0';
          parent = parent.parentElement;
        }

        // Force the element and its parent documents to selected dimensions
        clonedDoc.body.style.width = `${captureWidth}px`
        clonedDoc.body.style.overflow = 'visible'
        
        clonedElement.style.width = `${captureWidth}px`
        clonedElement.style.minWidth = `${captureWidth}px`
        clonedElement.style.height = 'auto'
        clonedElement.style.transform = 'none'
        clonedElement.style.margin = '0'
        clonedElement.style.position = 'relative'
        clonedElement.style.visibility = 'visible'
        clonedElement.style.padding = '40px'
      }
    }
  })

  await new Promise(resolve => setTimeout(resolve, 100))

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', format)
  
  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(filename)
}

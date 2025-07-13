import jsPDF from 'jspdf';
import { Secret } from '../types/secret';

export const exportToPDF = (secrets: Secret[]) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('SecretStash Export', 20, 20);
  
  // Date
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  
  let yPosition = 50;
  
  secrets.forEach((secret, index) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Secret title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${secret.title}`, 20, yPosition);
    yPosition += 10;
    
    // Category
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Category: ${secret.category.replace('-', ' ').toUpperCase()}`, 20, yPosition);
    yPosition += 7;
    
    // Description
    if (secret.description) {
      doc.text(`Description: ${secret.description}`, 20, yPosition);
      yPosition += 7;
    }
    
    // Value (first 100 characters for security)
    const truncatedValue = secret.value.length > 100 ? 
      secret.value.substring(0, 100) + '...' : 
      secret.value;
    doc.text(`Value: ${truncatedValue}`, 20, yPosition);
    yPosition += 7;
    
    // Tags
    if (secret.tags.length > 0) {
      doc.text(`Tags: ${secret.tags.join(', ')}`, 20, yPosition);
      yPosition += 7;
    }
    
    // Dates
    doc.text(`Created: ${new Date(secret.createdAt).toLocaleDateString()}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Updated: ${new Date(secret.updatedAt).toLocaleDateString()}`, 20, yPosition);
    yPosition += 15;
  });
  
  // Save the PDF
  doc.save('secretstash-export.pdf');
};
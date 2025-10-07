#!/usr/bin/env python3
"""
Vendoora PDF Analyzer & Image Extractor
Extracts images, text, and metadata from Trinity-TAJ PDF catalogs
"""

import os
import sys
import json
from pathlib import Path

def check_dependencies():
    """Check if required Python packages are installed"""
    required = ['PyPDF2', 'pdf2image', 'Pillow']
    missing = []
    
    for package in required:
        try:
            __import__(package)
        except ImportError:
            missing.append(package)
    
    if missing:
        print("Missing required packages. Install with:")
        print(f"pip install {' '.join(missing)}")
        return False
    return True

def extract_pdf_images(pdf_path, output_dir):
    """
    Extract images from PDF file
    
    Args:
        pdf_path: Path to PDF file
        output_dir: Directory to save extracted images
    """
    try:
        import PyPDF2
        from PIL import Image
        import io
        
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        pdf_name = Path(pdf_path).stem
        
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            image_count = 0
            
            print(f"\nAnalyzing: {pdf_path}")
            print(f"Total pages: {len(pdf_reader.pages)}")
            
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                
                if '/XObject' in page['/Resources']:
                    x_object = page['/Resources']['/XObject'].get_object()
                    
                    for obj in x_object:
                        if x_object[obj]['/Subtype'] == '/Image':
                            try:
                                size = (x_object[obj]['/Width'], x_object[obj]['/Height'])
                                data = x_object[obj].get_data()
                                
                                # Try to create image
                                if x_object[obj]['/ColorSpace'] == '/DeviceRGB':
                                    mode = "RGB"
                                else:
                                    mode = "P"
                                
                                image = Image.frombytes(mode, size, data)
                                
                                # Save image
                                image_filename = f"{pdf_name}_page{page_num+1}_img{image_count}.png"
                                image_path = output_path / image_filename
                                image.save(image_path)
                                
                                print(f"  ✓ Extracted: {image_filename} ({size[0]}×{size[1]})")
                                image_count += 1
                                
                            except Exception as e:
                                print(f"  ✗ Failed to extract image: {e}")
            
            print(f"\nTotal images extracted: {image_count}")
            return image_count
            
    except Exception as e:
        print(f"Error extracting images: {e}")
        return 0

def extract_pdf_text(pdf_path):
    """
    Extract text content from PDF
    
    Args:
        pdf_path: Path to PDF file
        
    Returns:
        Dictionary with page text
    """
    try:
        import PyPDF2
        
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text_data = {
                'filename': Path(pdf_path).name,
                'pages': len(pdf_reader.pages),
                'content': []
            }
            
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                text_data['content'].append({
                    'page': page_num + 1,
                    'text': text
                })
            
            return text_data
            
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None

def convert_pdf_to_images(pdf_path, output_dir, dpi=300):
    """
    Convert each PDF page to high-resolution image
    
    Args:
        pdf_path: Path to PDF file
        output_dir: Directory to save images
        dpi: Resolution (default 300 for print quality)
    """
    try:
        from pdf2image import convert_from_path
        
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        pdf_name = Path(pdf_path).stem
        
        print(f"\nConverting PDF to images: {pdf_path}")
        
        images = convert_from_path(pdf_path, dpi=dpi)
        
        for i, image in enumerate(images):
            image_filename = f"{pdf_name}_page{i+1}.png"
            image_path = output_path / image_filename
            image.save(image_path, 'PNG')
            print(f"  ✓ Converted page {i+1}: {image_filename}")
        
        print(f"\nTotal pages converted: {len(images)}")
        return len(images)
        
    except Exception as e:
        print(f"Error converting PDF: {e}")
        print("\nNote: pdf2image requires poppler-utils:")
        print("  macOS: brew install poppler")
        print("  Linux: apt-get install poppler-utils")
        print("  Windows: Download from https://github.com/oschwartz10612/poppler-windows")
        return 0

def analyze_pdf(pdf_path, output_dir):
    """
    Complete PDF analysis: extract images, text, and metadata
    
    Args:
        pdf_path: Path to PDF file
        output_dir: Base directory for output
    """
    pdf_name = Path(pdf_path).stem
    
    # Create output directories
    images_dir = Path(output_dir) / pdf_name / 'images'
    pages_dir = Path(output_dir) / pdf_name / 'pages'
    text_dir = Path(output_dir) / pdf_name / 'text'
    
    print("="*80)
    print(f"PDF ANALYZER - {Path(pdf_path).name}")
    print("="*80)
    
    # Extract embedded images
    print("\n[1/3] Extracting embedded images...")
    image_count = extract_pdf_images(pdf_path, images_dir)
    
    # Convert pages to images
    print("\n[2/3] Converting pages to images...")
    page_count = convert_pdf_to_images(pdf_path, pages_dir, dpi=300)
    
    # Extract text
    print("\n[3/3] Extracting text content...")
    text_data = extract_pdf_text(pdf_path)
    
    if text_data:
        text_dir.mkdir(parents=True, exist_ok=True)
        text_file = text_dir / f"{pdf_name}_text.json"
        with open(text_file, 'w', encoding='utf-8') as f:
            json.dump(text_data, f, indent=2, ensure_ascii=False)
        print(f"  ✓ Saved text to: {text_file}")
    
    # Create summary
    summary = {
        'pdf_file': Path(pdf_path).name,
        'embedded_images': image_count,
        'pages_converted': page_count,
        'total_pages': text_data['pages'] if text_data else 0,
        'output_directory': str(Path(output_dir) / pdf_name),
        'directories': {
            'embedded_images': str(images_dir) if image_count > 0 else None,
            'page_images': str(pages_dir) if page_count > 0 else None,
            'text_content': str(text_dir) if text_data else None,
        }
    }
    
    summary_file = Path(output_dir) / pdf_name / 'summary.json'
    summary_file.parent.mkdir(parents=True, exist_ok=True)
    with open(summary_file, 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2)
    
    print("\n" + "="*80)
    print("ANALYSIS COMPLETE")
    print("="*80)
    print(f"Embedded images: {image_count}")
    print(f"Pages converted: {page_count}")
    print(f"Summary saved: {summary_file}")
    
    return summary

def main():
    """Main entry point"""
    if len(sys.argv) < 2:
        print("Usage: python pdf-analyzer.py <pdf_file> [output_dir]")
        print("\nExample:")
        print("  python pdf-analyzer.py references/pdf/Trinity-TAJ-Smart-Lock-2025.pdf references/extracted")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else 'references/extracted'
    
    if not os.path.exists(pdf_path):
        print(f"Error: PDF file not found: {pdf_path}")
        sys.exit(1)
    
    if not check_dependencies():
        sys.exit(1)
    
    analyze_pdf(pdf_path, output_dir)

if __name__ == '__main__':
    main()


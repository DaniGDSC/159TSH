import argparse
import qrcode
from qrcode.constants import ERROR_CORRECT_L
from qrcode.image.svg import SvgPathImage
from urllib.parse import urlparse
from typing import Optional

def is_valid_url(url: str) -> bool:
    """Check if the URL has a valid format."""
    parsed = urlparse(url)
    return all([parsed.scheme, parsed.netloc])

def generate_qr_code(
    url: str,
    output_file: str = "qrcode.svg",
    version: int = 1,
    box_size: int = 10,
    border: int = 4,
    error_correction=ERROR_CORRECT_L
) -> str:
    """Generate a QR code in SVG format for the given URL.
    
    Args:
        url (str): The URL to encode in the QR code.
        output_file (str): File path to save the SVG QR code.
        version (int): Controls the size of the QR Code.
        box_size (int): Size of each box in pixels.
        border (int): Border thickness (minimum 4 recommended).
        error_correction: Error correction level (default: ERROR_CORRECT_L).
    
    Returns:
        str: The path to the saved SVG file.
    
    Raises:
        ValueError: If the URL is empty or invalid.
        OSError: If there's an error saving the file.
    """
    if not url or not isinstance(url, str) or not is_valid_url(url):
        raise ValueError("A valid URL is required.")
    
    try:
        qr = qrcode.QRCode(
            version=version,
            error_correction=error_correction,
            box_size=box_size,
            border=border,
            image_factory=SvgPathImage
        )
        qr.add_data(url)
        qr.make(fit=True)

        img = qr.make_image()
        img.save(output_file)

        print(f"✅ QR code saved as: {output_file}")
        return output_file

    except Exception as e:
        raise OSError(f"Error generating or saving QR code: {str(e)}")

def main():
    """Default usage without CLI: generate a QR code for a hardcoded URL."""
    website_url = (
        "https://docs.google.com/forms/d/e/1FAIpQLScLQ2y167XiyYEKSJFvuV2MON6z2eNALMZwPKMpnphdSlRYGw/viewform?hl=vi"
    )
    try:
        generate_qr_code(website_url, "qrcode.svg")
    except (ValueError, OSError) as e:
        print(f"❌ Error: {str(e)}")

def cli():
    """Command-line interface for generating a QR code."""
    parser = argparse.ArgumentParser(description="Generate an SVG QR Code for a URL")
    parser.add_argument("url", help="URL to encode in the QR code")
    parser.add_argument("-o", "--output", default="qrcode.svg", help="Output SVG file path (default: qrcode.svg)")
    parser.add_argument("--version", type=int, default=1, help="QR Code version (default: 1)")
    parser.add_argument("--box_size", type=int, default=10, help="Size of each box (default: 10)")
    parser.add_argument("--border", type=int, default=4, help="Border size (default: 4)")

    args = parser.parse_args()

    try:
        generate_qr_code(
            url=args.url,
            output_file=args.output,
            version=args.version,
            box_size=args.box_size,
            border=args.border
        )
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        cli()  # Run with CLI arguments
    else:
        main()  # Run default test case

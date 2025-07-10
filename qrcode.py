import segno

def generate_qr_segno(url: str, output_file: str = "qrcode.svg") -> None:
    qr = segno.make(url)
    qr.save(output_file, scale=5)
    print(f"✅ QR code saved as {output_file}")

# Example usage
generate_qr_segno("https://docs.google.com/forms/d/e/1FAIpQLScLQ2y167XiyYEKSJFvuV2MON6z2eNALMZwPKMpnphdSlRYGw/viewform?hl=vi")

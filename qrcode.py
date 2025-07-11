import segno

def generate_qr_segno(url: str, output_file: str = "qrcode.png") -> None:
    qr = segno.make(url)
    qr.save(output_file, scale=5)
    print(f"✅ QR code saved as {output_file}")

# Example usage
generate_qr_segno("http://54.179.218.141/")

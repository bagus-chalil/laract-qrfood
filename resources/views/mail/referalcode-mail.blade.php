<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Email Referal Kode Pemesanan Makanan | PT Kimia Farma</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Email undangan & kode referal pemesanan makanan HUT KF-54" name="description" />
    <meta content="IT KFHO" name="author" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>

<body style="font-family: 'Roboto', sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 3px 15px rgba(30,32,37,.06); padding: 30px;">
                    <tr>
                        <td style="text-align: center;">
                            <h4 style="margin: 0 0 15px; font-weight: 600; font-size: 20px;">
                                Referal Kode untuk Pemesanan Makanan <br> HUT KF ke-54
                            </h4>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 15px; color: #555; line-height: 1.6;">
                            <p>Halo Insan Kimia Farma 🎉,</p>
                            <p>
                                Dalam rangka memeriahkan acara <b>Festival Rakyat di HUT KF ke-54</b>, kami mengundang Anda untuk menikmati berbagai hidangan lezat yang telah kami siapkan. Jangan lewatkan kesempatan ini untuk mencicipi hidangan spesial yang hanya tersedia untuk Anda!
                            </p>
                            <p style="margin-top: 20px; color: #878a99;">
                                Kode referal Anda adalah:
                            </p>
                            <div style="display: inline-block; padding: 10px 20px; background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 8px; font-family: monospace; font-size: 18px; font-weight: bold; letter-spacing: 1px; color: #111827;">
                                {{ $user->referal_code }}
                            </div>
                            <p style="margin-top: 25px;">
                                📱 Cara Pemesanan:
                                <br>
                                Silakan masuk ke aplikasi pemesanan melalui link berikut:
                                <br>
                                <a href="https://fest-kf-54.kimiafarma.app/order/{{ $user->referal_code }}" style="color: #2563eb; text-decoration: underline;">
                                    https://fest-kf-54.kimiafarma.app/order/{{ $user->referal_code }}
                                </a>
                            </p>
                            <p style="margin-top: 25px; background-color: #fff3cd; padding: 12px; border: 1px solid #ffeeba; border-radius: 6px; color: #856404;">
                                ⚠️ Pemesanan makanan dilakukan paling lambat <b>Kamis, 14 Agustus 2025 jam 15.00</b>.
                            </p>
                            <p style="margin-top: 20px;">Terima kasih, semoga sehat selalu.</p>
                        </td>
                    </tr>
                </table>
                <p style="margin-top: 20px; font-size: 12px; color: #98a6ad;">
                    &copy; <?= date('Y') ?> PT Kimia Farma Tbk. Development by IT KFHO
                </p>
            </td>
        </tr>
    </table>
</body>

</html>

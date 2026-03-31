<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 20px;
        }
        .label {
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
        }
        .value {
            background: white;
            padding: 10px;
            border-radius: 4px;
            border-left: 4px solid #2563eb;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
        <div class="field">
            <div class="label">Name:</div>
            <div class="value">{{ $data['name'] }}</div>
        </div>
        
        <div class="field">
            <div class="label">Email:</div>
            <div class="value">{{ $data['email'] }}</div>
        </div>
        <div class="field">
            <div class="label">Phone:</div>
            <div class="value">{{ $data['phone'] }}</div>
        </div>
        
        <div class="field">
            <div class="label">Message:</div>
            <div class="value">{{ nl2br($data['message']) }}</div>
        </div>
        
        <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">
            This message was sent from the contact form on your website.
        </p>
    </div>
</body>
</html>
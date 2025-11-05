const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});


            client.on('qr', qr => {
                console.log('QR Code generated');
                qrcode.generate(qr, { small: true });
            });

            client.on('ready', () => {
                console.log('WhatsApp Client is ready!');
            });

            client.on('auth_failure', () => {
                console.error('Authentication failed');
            });

            client.on('disconnected', (reason) => {
                console.log('Client disconnected:', reason);
            });

            client.on('message', async (message) => {
                try {
                    const chat = await message.getChat();
                    
                    if (!chat.isGroup) {
                        await client.sendMessage(message.from, 'This number is temporarily unavailable on WhatsApp. Your message has been received and will be seen after a few days.');
                        console.log(`Auto-reply sent to ${message.from}`);
                    }
                } catch (error) {
                    console.error('Error handling message:', error);
                }
            });

            await client.initialize();
            console.log('Client initialized successfully');
            return client;
            
        } catch (error) {
            console.error(`Initialization attempt ${i + 1} failed:`, error.message);
            console.error('Full error:', error);
            
            if (i < retries - 1) {
                console.log(`Retrying in 10 seconds...`);
                await new Promise(resolve => setTimeout(resolve, 10000));
            } else {
                throw error;
            }
        }
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully');
    process.exit(0);
});

initializeClient().catch(error => {
    console.error('Failed to initialize client after all retries:', error);
    process.exit(1);

});

(function(global) {
            // Inject Font Awesome CSS
            const fontAwesomeLink = document.createElement('link');
            fontAwesomeLink.rel = 'stylesheet';
            fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            document.head.appendChild(fontAwesomeLink);

            // Inject custom styles
            const style = document.createElement('style');
            style.innerHTML = `
                /* Styles for the alert */
                .alert-container {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 20px;
                    border-radius: 12px;
                    color: #fff;
                    font-family: Arial, sans-serif;
                    z-index: 9999;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    opacity: 0;
                    animation: fadeIn 0.5s forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -60%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }

                .alert-container.success { background-color: #4CAF50; }
                .alert-container.warning { background-color: #FFC107; }
                .alert-container.error { background-color: #F44336; }

                .alert-icon {
                    font-size: 48px;
                    margin-bottom: 15px;
                }

                .alert-title {
                    margin-bottom: 15px;
                    font-size: 20px;
                    font-weight: bold;
                }

                .alert-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                    background-color: white;
                    color: black;
                    transition: background-color 0.3s ease;
                }

                
            `;
            document.head.appendChild(style);

            // Create alert function
            function createAlert(options) {
                const defaults = {
                    title: "Alert",
                    buttonText: "OK",
                    type: "success",
                    width: "auto",
                    height: "auto",
                    textWidth: "100%",
                    textHeight: "auto",
                    buttonWidth: "auto",
                    buttonHeight: "auto"
                };

                const settings = { ...defaults, ...options };

                const container = document.createElement('div');
                container.className = `alert-container ${settings.type}`;
                container.style.width = settings.width;
                container.style.height = settings.height;

                const iconElement = document.createElement('div');
                iconElement.className = 'alert-icon';
                switch (settings.type) {
                    case 'success':
                        iconElement.innerHTML = '<i class="fas fa-check-circle"></i>';
                        break;
                    case 'warning':
                        iconElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                        break;
                    case 'error':
                        iconElement.innerHTML = '<i class="fas fa-times-circle"></i>';
                        break;
                    default:
                        iconElement.innerHTML = '<i class="fas fa-info-circle"></i>';
                        break;
                }
                container.appendChild(iconElement);

                const title = document.createElement('div');
                title.textContent = settings.title;
                title.className = 'alert-title';
                title.style.width = settings.textWidth;
                title.style.height = settings.textHeight;
                container.appendChild(title);

                const button = document.createElement('button');
                button.textContent = settings.buttonText;
                button.className = `alert-button ${settings.type}`;
                button.style.width = settings.buttonWidth;
                button.style.height = settings.buttonHeight;
                button.addEventListener('click', function() {
                    document.body.removeChild(container);
                });
                container.appendChild(button);

                document.body.appendChild(container);
            }

            global.Alertjs = {
                create: createAlert
            };

            // Auto-load alert on page load
            window.addEventListener('load', function() {
                Alertjs.create({
                    title: 'Welcome to AlertJS!',
                    buttonText: 'Close',
                    type: 'success',
                    width: '300px',
                    height: 'auto',
                    textWidth: '100%',
                    textHeight: 'auto',
                    buttonWidth: '100px',
                    buttonHeight: '40px'
                });
            });
        })(this);
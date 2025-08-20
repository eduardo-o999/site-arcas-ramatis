document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const form = document.getElementById('treatmentForm');
    const whatsappInput = document.getElementById('whatsapp');
    const companionRadios = document.querySelectorAll('input[name="needsCompanion"]');
    const companionNameGroup = document.getElementById('companionNameGroup');
    const companionNameInput = document.getElementById('companionName');

    // Máscara para WhatsApp
    function formatWhatsApp(value) {
        // Remove todos os caracteres não numéricos
        const numbers = value.replace(/\D/g, '');
        
        // Aplica a máscara (11) 99999-9999
        if (numbers.length <= 11) {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        
        return value;
    }

    // Aplica máscara no campo WhatsApp
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            const cursorPos = e.target.selectionStart;
            const oldLength = e.target.value.length;
            
            e.target.value = formatWhatsApp(e.target.value);
            
            // Ajusta a posição do cursor
            const newLength = e.target.value.length;
            const newCursorPos = cursorPos + (newLength - oldLength);
            e.target.setSelectionRange(newCursorPos, newCursorPos);
        });

        whatsappInput.addEventListener('keypress', function(e) {
            // Permite apenas números, backspace, delete e teclas de navegação
            if (!/[\d\b\s\-\(\)]/.test(String.fromCharCode(e.keyCode))) {
                e.preventDefault();
            }
        });
    }

    // Controle de exibição do campo de acompanhante
    companionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                companionNameGroup.style.display = 'block';
                companionNameInput.setAttribute('required', 'required');
            } else {
                companionNameGroup.style.display = 'none';
                companionNameInput.removeAttribute('required');
                companionNameInput.value = '';
                clearFieldError(companionNameInput);
            }
        });
    });

    // Validação de campos
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Remove mensagens de erro anteriores
        clearFieldError(field);

        // Validação por tipo de campo
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Por favor, insira um e-mail válido.';
                }
                break;

            case 'tel':
                // Remove caracteres não numéricos para validação
                const numbersOnly = value.replace(/\D/g, '');
                if (numbersOnly.length !== 11) {
                    isValid = false;
                    message = 'Por favor, insira um WhatsApp válido com DDD.';
                }
                break;

            case 'number':
                const age = parseInt(value);
                if (isNaN(age) || age < 1 || age > 150) {
                    isValid = false;
                    message = 'Por favor, insira uma idade válida.';
                }
                break;

            default:
                if (field.hasAttribute('required') && value === '') {
                    isValid = false;
                    message = 'Este campo é obrigatório.';
                } else if (value.length < 2 && value.length > 0) {
                    isValid = false;
                    message = 'Por favor, insira pelo menos 2 caracteres.';
                }
                break;
        }

        // Validações específicas para textarea
        if (field.tagName.toLowerCase() === 'textarea' && field.hasAttribute('required')) {
            if (value.length < 10) {
                isValid = false;
                message = 'Por favor, forneça mais detalhes (mínimo 10 caracteres).';
            }
        }

        // Aplica estilo de acordo com a validação
        if (!isValid) {
            showFieldError(field, message);
        } else {
            showFieldSuccess(field);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.remove('success');
        field.classList.add('error');
        
        // Remove mensagem de erro existente
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Adiciona nova mensagem de erro
        const errorDiv = document.createElement('span');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function showFieldSuccess(field) {
        field.classList.remove('error');
        field.classList.add('success');
        clearFieldError(field);
    }

    function clearFieldError(field) {
        field.classList.remove('error', 'success');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Validação em tempo real
    const formFields = form.querySelectorAll('input[required], textarea[required]');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        field.addEventListener('input', function() {
            // Remove erro quando o usuário começa a digitar
            if (this.classList.contains('error')) {
                clearFieldError(this);
            }
        });
    });

    // Validação de radio buttons
    function validateRadioGroup(groupName) {
        const radios = document.querySelectorAll(`input[name="${groupName}"]`);
        const isSelected = Array.from(radios).some(radio => radio.checked);
        
        const firstRadio = radios[0];
        const radioGroup = firstRadio.closest('.form-group');
        
        // Remove mensagens de erro anteriores
        const existingError = radioGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        if (!isSelected) {
            const errorDiv = document.createElement('span');
            errorDiv.className = 'error-message';
            errorDiv.textContent = 'Por favor, selecione uma opção.';
            radioGroup.appendChild(errorDiv);
            return false;
        }
        
        return true;
    }

    // Submissão do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos os campos
        let isFormValid = true;
        
        // Validar campos de input e textarea
        const allFields = form.querySelectorAll('input, textarea');
        allFields.forEach(field => {
            if (field.hasAttribute('required') || field.value.trim() !== '') {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            }
        });
        
        // Validar radio groups
        if (!validateRadioGroup('needsCompanion')) {
            isFormValid = false;
        }
        
        if (!validateRadioGroup('preferredDay')) {
            isFormValid = false;
        }
        
        // Se o formulário for válido, processa o envio
        if (isFormValid) {
            processFormSubmission();
        } else {
            // Scroll para o primeiro erro
            const firstError = form.querySelector('.error, .error-message');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    });

    function processFormSubmission() {
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Mostra loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Coleta os dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simula envio (substitua por integração real)
        setTimeout(() => {
            // Aqui você pode integrar com um serviço de email ou backend
            console.log('Dados do formulário:', data);
            
            // Mostra mensagem de sucesso
            showSuccessMessage();
            
            // Reset do botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Limpa o formulário após sucesso
            form.reset();
            companionNameGroup.style.display = 'none';
            
            // Remove todas as classes de validação
            const allFields = form.querySelectorAll('input, textarea');
            allFields.forEach(field => {
                clearFieldError(field);
            });
            
        }, 2000); // Simula delay de envio
    }

    function showSuccessMessage() {
        // Remove mensagem anterior se existir
        const existingMessage = document.querySelector('.success-banner');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Cria mensagem de sucesso
        const successDiv = document.createElement('div');
        successDiv.className = 'success-banner';
        successDiv.style.cssText = `
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
            animation: slideDown 0.5s ease-out;
        `;
        successDiv.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 1.5rem; margin-right: 10px;"></i>
            <strong>Formulário enviado com sucesso!</strong><br>
            <span style="font-size: 0.9rem; opacity: 0.9;">
                Entraremos em contato em breve para agendarmos seu tratamento.
            </span>
        `;
        
        // Insere antes do formulário
        const formContainer = document.querySelector('.form-container');
        formContainer.parentNode.insertBefore(successDiv, formContainer);
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 300);
        }, 5000);
        
        // Scroll para a mensagem
        successDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    // Melhorias de acessibilidade - Navegação por teclado nos radio buttons
    const radioGroups = document.querySelectorAll('.radio-group');
    radioGroups.forEach(group => {
        const radios = group.querySelectorAll('input[type="radio"]');
        
        radios.forEach((radio, index) => {
            radio.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % radios.length;
                    radios[nextIndex].focus();
                    radios[nextIndex].checked = true;
                    radios[nextIndex].dispatchEvent(new Event('change'));
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevIndex = index === 0 ? radios.length - 1 : index - 1;
                    radios[prevIndex].focus();
                    radios[prevIndex].checked = true;
                    radios[prevIndex].dispatchEvent(new Event('change'));
                }
            });
        });
    });

    // Auto-focus no primeiro campo ao carregar a página
    const firstInput = form.querySelector('input[type="text"]');
    if (firstInput) {
        setTimeout(() => {
            firstInput.focus();
        }, 500);
    }

    // Salvar dados do formulário no localStorage (draft)
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Carregar valor salvo
        const savedValue = localStorage.getItem(`form-${input.name}`);
        if (savedValue && input.type !== 'radio') {
            input.value = savedValue;
        } else if (savedValue && input.type === 'radio' && input.value === savedValue) {
            input.checked = true;
            input.dispatchEvent(new Event('change'));
        }

        // Salvar valor ao digitar
        input.addEventListener('input', function() {
            localStorage.setItem(`form-${this.name}`, this.value);
        });

        input.addEventListener('change', function() {
            if (this.type === 'radio' && this.checked) {
                localStorage.setItem(`form-${this.name}`, this.value);
            }
        });
    });

    // Limpar localStorage após envio bem-sucedido
    function clearFormDraft() {
        formInputs.forEach(input => {
            localStorage.removeItem(`form-${input.name}`);
        });
    }

    // Adicionar limpeza de draft à função de sucesso
    const originalShowSuccessMessage = showSuccessMessage;
    showSuccessMessage = function() {
        clearFormDraft();
        originalShowSuccessMessage();
    };
});
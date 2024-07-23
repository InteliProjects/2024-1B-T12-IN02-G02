// api/helpers/formdataservice.js

module.exports = {
    friendlyName: 'Form Data Service',
  
    description: 'Service for processing form data.',
  
    fn: async function() {
      return {
        validarTipoDeDado: function(campo, tipoEsperado) {
          if (typeof campo !== tipoEsperado) {
            throw new Error(`Tipo de dado inválido. Esperado: ${tipoEsperado}, Recebido: ${typeof campo}`);
          }
        },
  
        limparDados: function(campo) {
          return campo.trim().replace(/[^\w\s@.]/gi, '');
        },
  
        formatarDados: function(campo, tipo) {
          switch (tipo) {
            case 'date':
              return new Date(campo).toISOString().split('T')[0];
            case 'number':
              return parseFloat(campo).toFixed(2);
            default:
              return campo;
          }
        },
  
        validarRegrasDeNegocio: function(campo, regras) {
          if (regras.min !== undefined && campo.length < regras.min) {
            throw new Error(`Valor menor que o mínimo permitido: ${regras.min}`);
          }
          if (regras.max !== undefined && campo.length > regras.max) {
            throw new Error(`Valor maior que o máximo permitido: ${regras.max}`);
          }
          if (regras.regex && !regras.regex.test(campo)) {
            throw new Error('Valor não atende ao formato esperado.');
          }
        },
  
        tratarErros: function(fn) {
          return function(...args) {
            try {
              return fn(...args);
            } catch (error) {
              return { error: error.message };
            }
          };
        },
  
        processarCampo: function(campo, tipo, regras) {
          this.validarTipoDeDado(campo, tipo);
          campo = this.limparDados(campo);
          campo = this.formatarDados(campo, tipo);
          this.validarRegrasDeNegocio(campo, regras);
          return campo;
        }
      };
    }
  };
  
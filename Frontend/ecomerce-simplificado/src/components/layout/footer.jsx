const Footer = () => {
    const currentYear = new Date().getFullYear()
    
    return (
      <footer className="bg-white dark:bg-gray-900 border-t py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coluna 1: Sobre */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Ecomerce Simplificado</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uma plataforma simples e eficiente para compras online.
              </p>
            </div>
            
            {/* Coluna 2: Links Rápidos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/about" 
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a 
                    href="/terms" 
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a 
                    href="/privacy" 
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Coluna 3: Contato */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <address className="not-italic">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Rua Exemplo, 123 - Bairro
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  São Paulo - SP, 01234-567
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  contato@ecomercesimplificado.com.br
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  (11) 1234-5678
                </p>
              </address>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} Ecomerce Simplificado. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
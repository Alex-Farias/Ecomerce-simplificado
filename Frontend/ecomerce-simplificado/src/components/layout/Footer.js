// src/components/layout/Footer.js
export default function Footer() {
    return (
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Ecomerce Simplificado</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sua loja online para todas as necessidades.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Links Úteis</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">Sobre Nós</a></li>
                <li><a href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contato</a></li>
                <li><a href="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400">FAQ</a></li>
                <li><a href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Termos de Uso</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Contato</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Email: contato@ecomerce-simplificado.com</li>
                <li>Telefone: (00) 1234-5678</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ecomerce Simplificado. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    );
  }
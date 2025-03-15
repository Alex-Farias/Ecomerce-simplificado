'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/cart-context'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeItem, clearCart, loading } = useCart()
  const [processingCheckout, setProcessingCheckout] = useState(false)

  // Formatação de preço para o formato brasileiro
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return
    await updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = async (productId) => {
    await removeItem(productId)
    toast.success('Item removido do carrinho')
  }

  const handleClearCart = async () => {
    if (window.confirm('Tem certeza que deseja limpar o carrinho?')) {
      await clearCart()
      toast.success('Carrinho limpo com sucesso')
    }
  }

  const handleCheckout = async () => {
    setProcessingCheckout(true)
    try {
      // Aqui você implementaria a lógica de checkout
      // Simulando processamento
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Pedido realizado com sucesso!')
      await clearCart()
      router.push('/checkout/success')
    } catch (error) {
      console.error('Erro ao finalizar compra:', error)
      toast.error('Erro ao finalizar compra')
    } finally {
      setProcessingCheckout(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBagIcon className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="mt-4 text-2xl font-semibold">Seu carrinho está vazio</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Parece que você não adicionou nenhum produto ao seu carrinho ainda.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-700"
        >
          Continuar comprando
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Meu Carrinho</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Lista de Itens */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
                  {cart.items.map((item) => (
                    <li key={item.produto} className="py-6 flex">
                      {/* Imagem */}
                      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                        {item.produtoInfo?.imagem ? (
                          <Image
                            src={item.produtoInfo.imagem}
                            alt={item.produtoInfo.titulo}
                            width={96}
                            height={96}
                            className="object-cover object-center"
                          />
                        ) : (
                          <div className="bg-gray-200 dark:bg-gray-700 w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-500">
                              Sem imagem
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Detalhes */}
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium">
                            <h3>
                              <Link 
                                href={`/product/${item.produto}`}
                                className="hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {item.produtoInfo?.titulo}
                              </Link>
                            </h3>
                            <p className="ml-4">{formatPrice(item.produtoInfo?.preco * item.produtoQuantidade)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Preço unitário: {formatPrice(item.produtoInfo?.preco)}
                          </p>
                        </div>

                        {/* Controles de Quantidade */}
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleQuantityChange(item.produto, item.produtoQuantidade - 1)}
                              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                              disabled={item.produtoQuantidade <= 1}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="font-medium">{item.produtoQuantidade}</span>
                            <button
                              onClick={() => handleQuantityChange(item.produto, item.produtoQuantidade + 1)}
                              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.produto)}
                            className="font-medium text-red-600 hover:text-red-500 flex items-center"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            Remover
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-800 p-6">
              <button
                onClick={handleClearCart}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Limpar carrinho
              </button>
            </div>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="mt-8 lg:mt-0 lg:col-span-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium">Resumo do Pedido</h2>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p className="font-medium">{formatPrice(cart.total)}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">Frete</p>
                  <p className="font-medium">Grátis</p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="flex items-center justify-between font-medium">
                    <p>Total</p>
                    <p>{formatPrice(cart.total)}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Impostos incluídos
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  disabled={processingCheckout}
                  className="w-full rounded-md bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingCheckout ? 'Processando...' : 'Finalizar Compra'}
                </button>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  ou continue comprando
                </Link>
              </div>
            </div>
          </div>
          
          {/* Opções de Pagamento */}
          <div className="mt-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden p-6">
            <h3 className="text-sm font-medium mb-4">Aceitamos</h3>
            <div className="flex space-x-3">
              <div className="p-2 border rounded-md">Visa</div>
              <div className="p-2 border rounded-md">Mastercard</div>
              <div className="p-2 border rounded-md">Pix</div>
              <div className="p-2 border rounded-md">Boleto</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
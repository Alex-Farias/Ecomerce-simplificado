'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useCart } from '@/context/cart-context'
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import apiClient from '@/lib/api'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlist, setIsWishlist] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        
        // Em produção, use a API real
        // const response = await apiClient.products.getById(params.id)
        // setProduct(response.data)
        
        // Simulando dados para demonstração
        const simulatedProduct = {
          idProduto: parseInt(params.id),
          titulo: 'Smartphone XYZ Pro',
          descricao: 'O mais recente smartphone com câmera incrível de 108MP, tela AMOLED de 6.7", processador octa-core e bateria de 5000mAh com carregamento rápido.',
          preco: 1999.99,
          unidade: 'un',
          produtoCategoria: 1,
          imagem: '/images/product-placeholder.png',
          ativo: true,
          especificacoes: {
            cor: 'Preto',
            armazenamento: '128GB',
            memoria: '8GB RAM',
            cameraPrincipal: '108MP',
            telaPolegadas: 6.7,
            bateria: '5000mAh'
          },
          avaliacao: 4.5
        }
        
        setProduct(simulatedProduct)
        
        // Simulando produtos relacionados
        const simulatedRelated = [
          {
            idProduto: 2,
            titulo: 'Smartphone XYZ Standard',
            descricao: 'Versão standard do XYZ',
            preco: 1499.99,
            imagem: '/images/product-placeholder.png'
          },
          {
            idProduto: 3,
            titulo: 'Fone de Ouvido Bluetooth',
            descricao: 'Fone sem fio com cancelamento de ruído',
            preco: 299.99,
            imagem: '/images/product-placeholder.png'
          },
          {
            idProduto: 4,
            titulo: 'Carregador Rápido 65W',
            descricao: 'Carregador compatível com smartphone XYZ',
            preco: 129.99,
            imagem: '/images/product-placeholder.png'
          }
        ]
        
        setRelatedProducts(simulatedRelated)
      } catch (err) {
        console.error('Erro ao buscar produto:', err)
        setError('Não foi possível carregar o produto')
      } finally {
        setLoading(false)
      }
    }
    
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  // Formatação de preço para o formato brasileiro
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    try {
      const result = await addToCart(product, quantity)
      if (result.success) {
        toast.success(`${product.titulo} adicionado ao carrinho!`)
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error('Erro ao adicionar ao carrinho')
    }
  }

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist)
    if (!isWishlist) {
      toast.success(`${product.titulo} adicionado aos favoritos!`)
    } else {
      toast.success(`${product.titulo} removido dos favoritos!`)
    }
  }

  // Renderiza as estrelas de avaliação
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < Math.floor(rating) ? (
              <StarSolidIcon className="h-5 w-5 text-yellow-400" />
            ) : i < Math.ceil(rating) && i > Math.floor(rating) ? (
              <div className="relative">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <div 
                  className="absolute inset-0 overflow-hidden" 
                  style={{ width: `${(rating % 1) * 100}%` }}
                >
                  <StarSolidIcon className="h-5 w-5 text-yellow-400" />
                </div>
              </div>
            ) : (
              <StarIcon className="h-5 w-5 text-yellow-400" />
            )}
          </span>
        ))}
        <span className="ml-2 text-gray-600 text-sm">{rating.toFixed(1)}</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => router.back()} 
            className="inline-flex items-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Voltar
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <Link 
            href="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Voltar para a loja
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb e Voltar */}
      <div className="mb-6">
        <div className="flex items-center text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Início
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link 
            href={`/category/${product.produtoCategoria}`} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {product.produtoCategoria === 1 ? 'Eletrônicos' : 
             product.produtoCategoria === 2 ? 'Moda' : 
             product.produtoCategoria === 3 ? 'Casa e Cozinha' : 'Categoria'}
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="font-medium text-gray-900 dark:text-white">{product.titulo}</span>
        </div>
        <button 
          onClick={() => router.back()} 
          className="mt-2 inline-flex items-center text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Voltar
        </button>
      </div>

      {/* Detalhes do Produto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagem do Produto */}
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-96 w-full">
            {product.imagem ? (
              <Image
                src={product.imagem}
                alt={product.titulo}
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                <span className="text-gray-400 dark:text-gray-500">Sem imagem</span>
              </div>
            )}
          </div>
        </div>

        {/* Informações do Produto */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{product.titulo}</h1>
          
          <div className="mt-2">
            {product.avaliacao && renderRating(product.avaliacao)}
          </div>
          
          <div className="mt-4">
            <span className="text-2xl font-bold">{formatPrice(product.preco)}</span>
            <span className="ml-2 text-sm text-gray-500">/ {product.unidade}</span>
          </div>
          
          <div className="mt-6 text-gray-600 dark:text-gray-300">
            <p>{product.descricao}</p>
          </div>
          
          {/* Especificações */}
          {product.especificacoes && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Especificações</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.especificacoes).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[120px]">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                    </span>
                    <span className="text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantidade */}
          <div className="mt-8">
            <label htmlFor="quantity" className="block text-sm font-medium mb-2">
              Quantidade
            </label>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="rounded-l-md border border-gray-300 px-3 py-2 dark:border-gray-600"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 border-t border-b border-gray-300 py-2 text-center focus:outline-none dark:border-gray-600 dark:bg-gray-800"
              />
              <button
                onClick={increaseQuantity}
                className="rounded-r-md border border-gray-300 px-3 py-2 dark:border-gray-600"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Botões de Ação */}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-md bg-primary-600 px-4 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span className="flex items-center justify-center">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </span>
            </button>
            <button
              onClick={toggleWishlist}
              className="rounded-md border border-gray-300 p-3 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label={isWishlist ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <HeartIcon className={`h-6 w-6 ${isWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
          
          {/* Garantia e Frete */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-md border border-gray-200 p-4 dark:border-gray-700">
              <h4 className="font-medium">Garantia</h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">12 meses de garantia</p>
            </div>
            <div className="rounded-md border border-gray-200 p-4 dark:border-gray-700">
              <h4 className="font-medium">Entrega</h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Frete grátis para todo o Brasil</p>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos Relacionados */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.idProduto}
                href={`/product/${relatedProduct.idProduto}`}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm transition-shadow group-hover:shadow-md">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {relatedProduct.imagem ? (
                      <Image
                        src={relatedProduct.imagem}
                        alt={relatedProduct.titulo}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500">Sem imagem</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {relatedProduct.titulo}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {relatedProduct.descricao}
                    </p>
                    <p className="mt-2 font-bold">{formatPrice(relatedProduct.preco)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
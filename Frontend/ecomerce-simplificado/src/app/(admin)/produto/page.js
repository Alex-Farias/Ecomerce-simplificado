'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/components/layout/sidebar'
import apiClient from '@/lib/api'

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  // Carrega os produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        // Em produção, use a API real
        // const response = await apiClient.products.getAll()
        // setProducts(response.data)
        
        // Simulando produtos para demonstração
        const simulatedData = [
          {
            idProduto: 1,
            titulo: 'Smartphone XYZ',
            descricao: 'Um smartphone incrível com ótima câmera e bateria',
            preco: 1999.99,
            unidade: 'un',
            produtoCategoria: 1,
            imagem: '/images/product-placeholder.png',
            ativo: true
          },
          {
            idProduto: 2,
            titulo: 'Notebook ABC',
            descricao: 'Notebook leve e potente para trabalho e lazer',
            preco: 3999.99,
            unidade: 'un',
            produtoCategoria: 1,
            imagem: '/images/product-placeholder.png',
            ativo: true
          },
          {
            idProduto: 3,
            titulo: 'Tênis Esportivo',
            descricao: 'Tênis confortável para atividades físicas',
            preco: 299.99,
            unidade: 'par',
            produtoCategoria: 2,
            imagem: '/images/product-placeholder.png',
            ativo: true
          }
        ]
        
        setProducts(simulatedData)
      } catch (err) {
        console.error('Erro ao buscar produtos:', err)
        setError('Falha ao carregar os produtos')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  // Função para abrir o modal de confirmação de exclusão
  const confirmDelete = (product) => {
    setProductToDelete(product)
    setIsDeleteModalOpen(true)
  }

  // Função para excluir um produto
  const handleDelete = async () => {
    if (!productToDelete) return
    
    try {
      // Em produção, use a API real
      // await apiClient.products.delete(productToDelete.idProduto)
      
      // Simulando exclusão local
      setProducts(products.filter(p => p.idProduto !== productToDelete.idProduto))
      
      toast.success(`Produto "${productToDelete.titulo}" excluído com sucesso!`)
      setIsDeleteModalOpen(false)
      setProductToDelete(null)
    } catch (error) {
      console.error('Erro ao excluir produto:', error)
      toast.error('Não foi possível excluir o produto')
    }
  }

  // Formatação de preço para o formato brasileiro
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar className="hidden md:block w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16" />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 max-w-full p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
          <Link
            href="/admin/produto/novo"
            className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Novo Produto
          </Link>
        </div>
        
        {loading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-40 bg-gray-200 dark:bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={() => router.refresh()}
              className="mt-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map((product) => (
                    <tr key={product.idProduto} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700 overflow-hidden">
                              {product.imagem ? (
                                <Image
                                  src={product.imagem}
                                  alt={product.titulo}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                  <span className="text-xs">Sem imagem</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{product.titulo}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {product.idProduto}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {product.produtoCategoria === 1 ? 'Eletrônicos' : 
                           product.produtoCategoria === 2 ? 'Moda' : 
                           product.produtoCategoria === 3 ? 'Casa e Cozinha' : 'Outra'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium">{formatPrice(product.preco)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Por {product.unidade}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.ativo
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {product.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/admin/produto/editar/${product.idProduto}`}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <PencilIcon className="h-5 w-5" />
                            <span className="sr-only">Editar</span>
                          </Link>
                          <button
                            onClick={() => confirmDelete(product)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <TrashIcon className="h-5 w-5" />
                            <span className="sr-only">Excluir</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {products.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum produto cadastrado.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Modal de Confirmação de Exclusão */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirmar exclusão</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tem certeza que deseja excluir o produto "{productToDelete?.titulo}"? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="btn btn-outline px-4 py-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
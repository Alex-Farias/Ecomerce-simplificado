'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import apiClient from '@/lib/api'

const ProductForm = ({ initialData = null }) => {
  const router = useRouter()
  const isEditing = !!initialData
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    unidade: 'un',
    preco: '',
    produtoCategoria: '',
    ativo: true,
    // Outros campos necessários
  })

  // Carrega as categorias
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Em produção, use a API real
        // const response = await apiClient.categories.getAll()
        // setCategories(response.data)
        
        // Simulando categorias para demonstração
        const simulatedData = [
          { idProdutoCategoria: 1, descricao: 'Eletrônicos' },
          { idProdutoCategoria: 2, descricao: 'Moda' },
          { idProdutoCategoria: 3, descricao: 'Casa e Cozinha' },
          { idProdutoCategoria: 4, descricao: 'Livros' },
          { idProdutoCategoria: 5, descricao: 'Esportes' },
        ]
        
        setCategories(simulatedData)
      } catch (err) {
        console.error('Erro ao buscar categorias:', err)
        toast.error('Não foi possível carregar as categorias')
      }
    }
    
    fetchCategories()
  }, [])

  // Se estiver editando, preenche o formulário com os dados iniciais
  useEffect(() => {
    if (isEditing) {
      setFormData({
        titulo: initialData.titulo || '',
        descricao: initialData.descricao || '',
        unidade: initialData.unidade || 'un',
        preco: initialData.preco ? initialData.preco.toString() : '',
        produtoCategoria: initialData.produtoCategoria ? initialData.produtoCategoria.toString() : '',
        ativo: initialData.ativo === undefined ? true : initialData.ativo,
      })
    }
  }, [initialData, isEditing])

  // Atualiza os dados do formulário quando um campo muda
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Função para salvar o produto
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validação básica
    if (!formData.titulo || !formData.descricao || !formData.preco || !formData.produtoCategoria) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }
    
    setLoading(true)
    
    try {
      const payload = {
        ...formData,
        preco: parseFloat(formData.preco),
        produtoCategoria: parseInt(formData.produtoCategoria),
      }
      
      // Se for edição, adiciona o ID
      if (isEditing) {
        payload.idProduto = initialData.idProduto
      }
      
      // Em produção, use a API real
      if (isEditing) {
        // await apiClient.products.update(payload)
        toast.success('Produto atualizado com sucesso!')
      } else {
        // await apiClient.products.create(payload)
        toast.success('Produto criado com sucesso!')
      }
      
      // Redireciona para a lista de produtos
      router.push('/admin/produto')
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
      toast.error('Ocorreu um erro ao salvar o produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título */}
      <div className="form-group">
        <label htmlFor="titulo" className="form-label">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={formData.titulo}
          onChange={handleChange}
          className="form-input"
          placeholder="Nome do produto"
          required
        />
      </div>
      
      {/* Descrição */}
      <div className="form-group">
        <label htmlFor="descricao" className="form-label">
          Descrição <span className="text-red-500">*</span>
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows="4"
          value={formData.descricao}
          onChange={handleChange}
          className="form-input resize-y"
          placeholder="Descrição detalhada do produto"
          required
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">
          Descreva as características e benefícios do produto.
        </p>
      </div>
      
      {/* Categoria e Unidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="produtoCategoria" className="form-label">
            Categoria <span className="text-red-500">*</span>
          </label>
          <select
            id="produtoCategoria"
            name="produtoCategoria"
            value={formData.produtoCategoria}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.idProdutoCategoria} value={category.idProdutoCategoria}>
                {category.descricao}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="unidade" className="form-label">
            Unidade <span className="text-red-500">*</span>
          </label>
          <select
            id="unidade"
            name="unidade"
            value={formData.unidade}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="un">Unidade (un)</option>
            <option value="kg">Quilograma (kg)</option>
            <option value="g">Grama (g)</option>
            <option value="l">Litro (l)</option>
            <option value="ml">Mililitro (ml)</option>
            <option value="par">Par</option>
            <option value="cx">Caixa (cx)</option>
            <option value="pct">Pacote (pct)</option>
          </select>
        </div>
      </div>
      
      {/* Preço e Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="preco" className="form-label">
            Preço <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">R$</span>
            </div>
            <input
              id="preco"
              name="preco"
              type="number"
              step="0.01"
              min="0"
              value={formData.preco}
              onChange={handleChange}
              className="form-input pl-10"
              placeholder="0,00"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="ativo" className="form-label flex items-center">
            <input
              id="ativo"
              name="ativo"
              type="checkbox"
              checked={formData.ativo}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-2">Produto ativo</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Produtos inativos não serão exibidos na loja.
          </p>
        </div>
      </div>
      
      {/* Upload de Imagem (simulado) */}
      <div className="form-group">
        <label className="form-label">Imagem do Produto</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500"
              >
                <span>Enviar arquivo</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
              <p className="pl-1">ou arraste e solte</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF até 5MB</p>
          </div>
        </div>
      </div>
      
      {/* Botões de Ação */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-outline px-4 py-2"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary px-4 py-2"
          disabled={loading}
        >
          {loading ? 'Salvando...' : isEditing ? 'Atualizar Produto' : 'Criar Produto'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
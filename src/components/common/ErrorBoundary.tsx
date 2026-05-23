import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    // 这里可以添加错误报告逻辑
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '40px',
            background: '#f5f5f5',
          }}
        >
          <span style={{ fontSize: '64px', marginBottom: '16px' }}>😵</span>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '8px' }}>
            哎呀，出错了！
          </h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', textAlign: 'center' }}>
            别担心，刷新页面试试吧！
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 32px',
              borderRadius: '24px',
              border: 'none',
              background: '#4FC3F7',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            刷新页面
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '24px', maxWidth: '600px', width: '100%' }}>
              <summary style={{ cursor: 'pointer', color: '#999', fontSize: '12px' }}>
                错误详情（开发模式）
              </summary>
              <pre
                style={{
                  marginTop: '8px',
                  padding: '16px',
                  background: '#fff',
                  borderRadius: '8px',
                  fontSize: '12px',
                  overflow: 'auto',
                  color: '#d32f2f',
                }}
              >
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

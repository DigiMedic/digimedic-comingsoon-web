"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-blumine mb-4">
            Něco se pokazilo
          </h2>
          <p className="text-lg text-astral">
            {this.state.error?.message || "Došlo k neočekávané chybě."}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

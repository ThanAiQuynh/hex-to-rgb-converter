import { useState } from 'react'
import './App.css'

function App() {
    const [hexInput, setHexInput] = useState('')
    const [rgbResult, setRgbResult] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleConvert = async () => {
        if (!hexInput.trim()) {
            setError('Please enter a hex color code')
            return
        }

        setLoading(true)
        setError('')
        setRgbResult(null)

        try {
            const response = await fetch('http://localhost:8000/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hex: hexInput }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || 'Conversion failed')
            }

            const data = await response.json()
            setRgbResult(data)
        } catch (err) {
            setError(err.message || 'Failed to convert hex to RGB')
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleConvert()
        }
    }

    const rgbColor = rgbResult ? `rgb(${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b})` : '#fff'

    return (
        <div className="app">
            <div className="container">
                <h1>🎨 Hex to RGB Converter</h1>

                <div className="converter-card">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter hex color (e.g., #FF5733 or FFF)"
                            value={hexInput}
                            onChange={(e) => setHexInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="hex-input"
                        />
                        <button
                            onClick={handleConvert}
                            disabled={loading}
                            className="convert-btn"
                        >
                            {loading ? 'Converting...' : 'Convert'}
                        </button>
                    </div>

                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}

                    {rgbResult && (
                        <div className="result-section">
                            <div
                                className="color-preview"
                                style={{ backgroundColor: rgbColor }}
                            ></div>

                            <div className="rgb-values">
                                <div className="rgb-value">
                                    <span className="label">R</span>
                                    <span className="value">{rgbResult.r}</span>
                                </div>
                                <div className="rgb-value">
                                    <span className="label">G</span>
                                    <span className="value">{rgbResult.g}</span>
                                </div>
                                <div className="rgb-value">
                                    <span className="label">B</span>
                                    <span className="value">{rgbResult.b}</span>
                                </div>
                            </div>

                            <div className="output-text">
                                rgb({rgbResult.r}, {rgbResult.g}, {rgbResult.b})
                            </div>
                        </div>
                    )}
                </div>

                <div className="examples">
                    <p className="examples-title">Try these examples:</p>
                    <div className="example-chips">
                        {['#FF5733', '#00FF00', '#0000FF', '#FFF', '#000'].map((hex) => (
                            <button
                                key={hex}
                                onClick={() => setHexInput(hex)}
                                className="example-chip"
                            >
                                {hex}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

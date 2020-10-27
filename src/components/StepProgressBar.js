import React from 'react'

export default function StepProgressBar() {
    return (
        <div className="step-progress-bar">
            <div className="step-progress-bar-step">
                <div className="step-progress-bar-step-index step-progress-bar-step-index--active">1</div>
                <div className="step-progress-bar-step-content">Your Product is partially verified</div>
            </div>
            <div className="step-progress-bar-step">
                <div className="step-progress-bar-step-index">2</div>
                <div className="step-progress-bar-step-content">Verify Manually</div>
            </div>
            <div className="step-progress-bar-step">
                <div className="step-progress-bar-step-index">3</div>
                <div className="step-progress-bar-step-content">Touch and feel to verify</div>
            </div>
        </div>
    )
}

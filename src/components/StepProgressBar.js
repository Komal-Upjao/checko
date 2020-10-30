import React, { Component } from 'react'


var totalHeight

export class StepProgressBar extends Component {

    calculateTotalHeight = () => {
        const nodes = document.getElementsByClassName("step-progress-bar-step-index");
        if (nodes.length > 0)
            totalHeight = nodes[nodes.length - 1].getBoundingClientRect().top - nodes[0].getBoundingClientRect().top;
        var progressContainer = document.createElement("div", "")
        progressContainer.classList.add("step-progress-bar-progress-container")
        document.getElementsByClassName("step-progress-bar")[0].prepend(progressContainer)
        progressContainer.style.height = totalHeight + "px"
    }

    componentDidMount() {
        this.calculateTotalHeight()
    }

    componentDidUpdate() {

        const processNodes = document.getElementsByClassName("step-progress-bar-step-index--process");
        var top = document.getElementsByClassName("step-progress-bar-step-index--finish")[0].getBoundingClientRect().top;
        if (processNodes.length > 0) {
            var height = processNodes[processNodes.length - 1].getBoundingClientRect().top - top;

            var progress = null
            if (document.getElementsByClassName("step-progress-bar-progress").length === 0) {
                progress = document.createElement("div", "")
                progress.classList.add("step-progress-bar-progress")
                document.getElementsByClassName("step-progress-bar")[0].prepend(progress)
                progress.style.height = "0px"
                setTimeout(() => {
                    progress.style.height = height + "px"
                }, 10);
            } else {
                progress = document.getElementsByClassName("step-progress-bar-progress")[0]
                progress.style.height = height + "px"
            }
            this.calculateTotalHeight()
        }
    }
    render() {
        const { steps } = this.props
        return (
            <div className="step-progress-bar">
                {steps.map((step, index) => <Step key={index} step={step} index={index} />)}
            </div>
        )
    }
}

export default StepProgressBar


function Step({ index, step }) {
    const { title, content, state } = step;
    return (
        <div className="step-progress-bar-step">
            <div className="step-progress-bar-step-header">
                <div className={"step-progress-bar-step-index step-progress-bar-step-index--" + state}>{index + 1}</div>
                <div className="step-progress-bar-step-title">{title}</div>
            </div>
            {state === 'process' && <div className="step-progress-bar-step-content">{content}</div>}
        </div>
    )
}


import React, { Component } from 'react'
import StepProgressBar from '../components/StepProgressBar'
import logo from '../assets/logo.jpg'
import ConfettiGenerator from "confetti-js"
import Loader from 'react-loader-spinner'

const proxyurl = "https://cors-anywhere.herokuapp.com/"

// function DataURIToBlob(dataURI) {
//     const splitDataURI = dataURI.split(',')
//     const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
//     const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

//     const ia = new Uint8Array(byteString.length)
//     for (let i = 0; i < byteString.length; i++)
//         ia[i] = byteString.charCodeAt(i)

//     return new Blob([ia], { type: mimeString })
// }

// function verify(imgBase64) {
//     var formdata = new FormData();
//     const file = DataURIToBlob(imgBase64)
//     formdata.append("input-image", file, 'image.jpg');

//     var requestOptions = {
//         method: 'POST',
//         body: formdata,
//         redirect: 'follow',
//     };

//     const urlParams = new URLSearchParams(window.location.search)
//     const code = urlParams.get('code')
//     fetch(proxyurl + "https://asia-south1-checko-backend.cloudfunctions.net/match-image?alphanumeric-key=" + code + "&type=preview", requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));
// }


function verifyBackup() {
    fetch("/C:/Users/devse/Downloads/barcode_roll11_J00007a0_405_0_sheet_405_row_7_col_5 (1).bmp")
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], "/C:/Users/devse/Downloads/barcode_roll11_J00007a0_405_0_sheet_405_row_7_col_5 (1).bmp", {
                type: 'image/bmp'
            });
            var formdata = new FormData();
            formdata.append("image_data", ``);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
            };

            const urlParams = new URLSearchParams(window.location.search)
            const code = urlParams.get('code')
            fetch(proxyurl + "https://asia-south1-checko-backend.cloudfunctions.net/match-image?alphanumeric-key=" + code + "&type=preview", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        })
}





export class Main extends Component {

    checkState = (index) => {
        this.setState(oldState => {
            var s = oldState.steps
            s[index].state = 'finish'
            if (index + 1 < s.length)
                s[index + 1].state = 'process'
            return { steps: s }

        })
    }

    partialVerification = () => {
        fetch('https://asia-south1-checko-backend.cloudfunctions.net/match-qr?alphanumeric-key=J00007a0')
            .then(res => res.json())
            .then(response => {
                console.log(response.qr_result)
                if (response.qr_result === 'Exists') {
                    this.checkState(0)
                }
            })
            .catch(error => console.error(error))
    }

    constructor(props) {
        super(props)

        this.state = {
            partiallyVerified: false,
            steps: [
                {
                    title: "Your product is partially verified",
                    content: <div></div>,
                    state: 'process'
                }, {
                    title: "Capture photo of tag",
                    content: <button onClick={() => this.checkState(1)}>Capture and Verify</button>,
                    state: 'wait'
                }, {
                    title: "Do you feel 3D features?",
                    content: <div><button onClick={() => this.checkState(2)}>Yes</button><button>No</button></div>,
                    state: 'wait'
                }
            ]
        }
    }

    componentDidMount() {
        this.partialVerification()
        // after 2 seconds set partially verified to true should be replaced by API 
        setTimeout(() => {
            this.setState({
                partiallyVerified: true
            })
            this.checkState(0)
        }, 2000);
    }

    componentDidUpdate() {
        var steps = this.state.steps
        if (steps[steps.length - 1].state === 'finish') {
            const confettiSettings = { target: 'confetti-canvas' };
            const confetti = new ConfettiGenerator(confettiSettings);
            document.getElementsByClassName("confetti-text")[0].style.opacity = '1'
            confetti.render();
        }
    }

    change = () => this.setState({
        steps: [{
            title: "Your product is partically verified",
            content: <div></div>,
            state: 'finish'
        }, {
            title: "Capture photo of tag",
            content: <button>Capture and Verify</button>,
            state: 'finish'
        }, {
            title: "Do you feel 3D features?",
            content: <div><button>Yes</button><button>No</button></div>,
            state: 'process'
        }]
    })

    render() {
        return (
            <div className="App">
                <canvas id="confetti-canvas" />
                <div className="confetti-text">Verified!</div>
                <div className="header">
                    <img src={logo} alt="Checko"  />
                </div>
                <div className="body">
                    {
                        this.state.partiallyVerified ?
                            <StepProgressBar steps={this.state.steps} change={this.change} /> :
                            <Loader
                                className="loader"
                                type="Oval"
                                color="#4cb648"
                                height={50}
                                width={50}
                            />
                    }

                </div>
                <div className="footer">
                    <a href='https://play.google.com/store/apps/details?id=com.transpacks.Checko1&hl=en_IN&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' /></a>
                </div>
            </div>
        )
    }
}

export default Main

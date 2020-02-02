import isSupportedBrowser from './helpers/isSupportedBrowser'
import observe from './helpers/intersectionObserver'

/**
 * Main plugin function
 * 
 * @param {} options 
 */
const animateJs = function (options) {
    options = {
        animationClass: 'ja__animate',
        selectorClass: 'ja__element',
        watchForChanges: true,
        ...options
    }

    const elements = document.querySelectorAll(`.${options.selectorClass}`)

    // if the browser is not supported, animate all items
    if (!isSupportedBrowser()) {
        elements.forEach(element => {
            element.classList.add(options.animationClass)
        })
    }

    const onElementInViewport = function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (options.animationClass) {
                    applyAnimation( entry.target )
                }
            }
        })
    }

    const applyAnimation = function (domNode) {
        if (domNode.dataset.jaAnimation) {
            domNode.classList.add(domNode.dataset.jaAnimation)
        }
    }

    const observer = observe(elements, onElementInViewport)

    const destroy = function () {
        observer.disconnect()
    }

}

/**
 * Export Public Plugin API
 */
export default animateJs
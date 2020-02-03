import isSupportedBrowser from './helpers/isSupportedBrowser'
import observe from './helpers/intersectionObserver'

/**
 * Main plugin function
 * 
 * @param {} options 
 */
const animateJs = function (options) {
    options = {
        animationClass: 'animated',
        selectorClass: 'ajs__element',
        watchForChanges: true,
        ...options
    }

    let elements = document.querySelectorAll(`.${options.selectorClass}`)

    // if the browser is not supported, animate all items
    if (!isSupportedBrowser()) {
        elements.forEach(element => {
            applyAnimation( element )
        })
    }

    /**
     * Callback to run when the element enters the viewport
     * 
     * @param [IntersectionObserverEntry] entries 
     * @param IntersectionObserver observer 
     */
    const onElementInViewport = function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (options.animationClass) {
                    applyAnimation( entry.target )
                }
            }
        })
    }

    /**
     * Apply animation
     * 
     * Will apply the animation class to the provided element
     * 
     * @param HTMLElement domNode The DOM node for which you want to apply the animation
     */
    const applyAnimation = function (domNode) {
        if (domNode.dataset.ajsAnimation) {
            domNode.classList.add(domNode.dataset.ajsAnimation, options.animationClass)
        }
    }

    const observer = observe(elements, onElementInViewport)

    const destroy = function () {
        observer.disconnect()
        elements = null
    }

    return {
        destroy
    }
}

/**
 * Export Public Plugin API
 */
export default animateJs
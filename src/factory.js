function factDiv(className, textContent) {
    const div = document.createElement('div');
    div.setAttribute('className', className);
    div.textContent = textContent;
    return div;
}
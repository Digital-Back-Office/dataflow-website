// Dataflow parallax animation
document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.data-node');
  const lines = document.querySelectorAll('.flow-line');
  const svg = document.getElementById('dataflowSvg');
  const heroSection = document.querySelector('section');
  // Tooltip element
  const tooltip = document.createElement('div');
  tooltip.id = 'heroTooltip';
  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '20';
  tooltip.style.pointerEvents = 'none';
  tooltip.className = 'px-2 py-1 rounded-md text-xs font-semibold bg-black/80 text-white shadow-lg';
  tooltip.style.display = 'none';
  heroSection && heroSection.appendChild(tooltip);
  
  if (!nodes.length || !svg || !heroSection) return;
  
  let animationComplete = false;
  
  // Boundaries for nodes (within viewBox coordinates)
  const BOUNDS = {
    minX: 150,
    maxX: 850,
    minY: 220,
    maxY: 620
  };
  
  // Initial spread animation from center
  nodes.forEach((node, index) => {
    const circle = node.querySelector('circle');
    const image = node.querySelector('image');
    const targetX = parseFloat(node.getAttribute('data-target-x') || '500');
    const targetY = parseFloat(node.getAttribute('data-target-y') || '400');
    const speed = parseFloat(node.getAttribute('data-speed') || '1');
    const name = node.getAttribute('data-name') || 'Data Tool';
    
    // Store target positions
    node.setAttribute('data-final-x', targetX.toString());
    node.setAttribute('data-final-y', targetY.toString());
    node.setAttribute('data-speed', speed.toString());
    
    // Animate from center (500, 400) to target position
    const delay = index * 150;
    
    setTimeout(() => {
      // Fade in and move to position with opacity animation
      animateNodeWithFade(circle, image, 500, 400, targetX, targetY, 0, 1, 800);
    }, delay);

    // Attach tooltip and hover brightness handlers
    if (circle) {
      circle.setAttribute('stroke-width', '1.5');
      circle.setAttribute('fill-opacity', '0.95');
      
      // Hover events for brightness and tooltip
      circle.addEventListener('mouseenter', (e) => {
        circle.style.filter = 'drop-shadow(0 0 10px rgba(48,186,186,0.9))';
        circle.setAttribute('stroke-width', '2');
        handleTooltip('mouseenter', e, name);
      });
      circle.addEventListener('mousemove', (e) => handleTooltip('mousemove', e, name));
      circle.addEventListener('mouseleave', (e) => {
        circle.style.filter = '';
        circle.setAttribute('stroke-width', '1.5');
        handleTooltip('mouseleave', e, name);
      });
    }
    if (image) {
      image.addEventListener('mouseenter', (e) => {
        if (circle) {
          circle.style.filter = 'drop-shadow(0 0 10px rgba(48,186,186,0.9))';
          circle.setAttribute('stroke-width', '2');
        }
        handleTooltip('mouseenter', e, name);
      });
      image.addEventListener('mousemove', (e) => handleTooltip('mousemove', e, name));
      image.addEventListener('mouseleave', (e) => {
        if (circle) {
          circle.style.filter = '';
          circle.setAttribute('stroke-width', '1.5');
        }
        handleTooltip('mouseleave', e, name);
      });
    }
    
    // Show lines after nodes are in position
    if (index === nodes.length - 1) {
      setTimeout(() => {
        lines.forEach((line, i) => {
          setTimeout(() => {
            line.setAttribute('opacity', '1');
          }, i * 100);
        });
        animationComplete = true;
      }, delay + 900);
    }
  });
  
  // Parallax effect on mouse move - attach to hero section
  heroSection.addEventListener('mousemove', (e) => {
    if (!animationComplete) return;
    
    const rect = heroSection.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    
    nodes.forEach(node => {
      const circle = node.querySelector('circle');
      const image = node.querySelector('image');
      const finalX = parseFloat(node.getAttribute('data-final-x') || '500');
      const finalY = parseFloat(node.getAttribute('data-final-y') || '400');
      const speed = parseFloat(node.getAttribute('data-speed') || '1');
      
      // Calculate parallax offset with reduced intensity
      const offsetX = (mouseX - 0.5) * 50 * speed;
      const offsetY = (mouseY - 0.5) * 40 * speed;
      
      // Apply offset and constrain within boundaries
      let newX = finalX + offsetX;
      let newY = finalY + offsetY;
      
      // Clamp to boundaries
      newX = Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, newX));
      newY = Math.max(BOUNDS.minY, Math.min(BOUNDS.maxY, newY));
      
      const imgSize = parseFloat(image?.getAttribute('width') || '16');
      
      circle?.setAttribute('cx', newX.toString());
      circle?.setAttribute('cy', newY.toString());
      image?.setAttribute('x', (newX - imgSize / 2).toString());
      image?.setAttribute('y', (newY - imgSize / 2).toString());
    });
  });
  
  // Reset on mouse leave
  heroSection.addEventListener('mouseleave', () => {
    if (!animationComplete) return;
    
    nodes.forEach(node => {
      const circle = node.querySelector('circle');
      const image = node.querySelector('image');
      const finalX = parseFloat(node.getAttribute('data-final-x') || '500');
      const finalY = parseFloat(node.getAttribute('data-final-y') || '400');
      
      const imgSize = parseFloat(image?.getAttribute('width') || '16');
      
      // Animate back to original position
      const currentX = parseFloat(circle?.getAttribute('cx') || finalX.toString());
      const currentY = parseFloat(circle?.getAttribute('cy') || finalY.toString());
      
      animateNode(circle, image, currentX, currentY, finalX, finalY, 400);
    });
  });
  
  // Helper function to animate node from start to end position
  function animateNode(circle, image, startX, startY, endX, endY, duration) {
    if (!circle || !image) return;
    
    const startTime = performance.now();
    const imgSize = parseFloat(image.getAttribute('width') || '16');
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentX = startX + (endX - startX) * eased;
      const currentY = startY + (endY - startY) * eased;
      
      circle.setAttribute('cx', currentX.toString());
      circle.setAttribute('cy', currentY.toString());
      image.setAttribute('x', (currentX - imgSize / 2).toString());
      image.setAttribute('y', (currentY - imgSize / 2).toString());
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  // Helper function to animate node with opacity transition
  function animateNodeWithFade(circle, image, startX, startY, endX, endY, startOpacity, endOpacity, duration) {
    if (!circle || !image) return;
    
    const startTime = performance.now();
    const imgSize = parseFloat(image.getAttribute('width') || '16');
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentX = startX + (endX - startX) * eased;
      const currentY = startY + (endY - startY) * eased;
      const currentOpacity = startOpacity + (endOpacity - startOpacity) * eased;
      
      circle.setAttribute('cx', currentX.toString());
      circle.setAttribute('cy', currentY.toString());
      circle.setAttribute('opacity', currentOpacity.toString());
      image.setAttribute('x', (currentX - imgSize / 2).toString());
      image.setAttribute('y', (currentY - imgSize / 2).toString());
      image.setAttribute('opacity', currentOpacity.toString());
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  function handleTooltip(evt, e, name) {
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    if (evt === 'mouseleave') {
      tooltip.style.display = 'none';
      return;
    }
    tooltip.textContent = name;
    tooltip.style.display = 'block';
    const x = e.clientX - rect.left + 12;
    const y = e.clientY - rect.top + 12;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }
});

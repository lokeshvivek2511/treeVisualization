import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './TreeVisualization.css';

const TreeVisualization = ({ data, searchId }) => {
    const svgRef = useRef();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef();

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const findPathToNode = (node, targetId, path = new Set()) => {
        if (!node) return false;
        
        path.add(node.data.id);
        
        if (node.data.id === targetId) {
            return true;
        }

        if (node.children) {
            for (let child of node.children) {
                if (findPathToNode(child, targetId, path)) {
                    return true;
                }
            }
        }
        
        path.delete(node.data.id);
        return false;
    };

    useEffect(() => {
        if (!data) return;

        // Calculate path nodes if searchId exists
        const pathNodes = new Set();
        if (searchId) {
            const root = d3.hierarchy(data);
            findPathToNode(root, searchId, pathNodes);
        }

        // Clear previous SVG
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Set dimensions
        const width = isFullscreen ? window.innerWidth - 40 : 960;
        const height = isFullscreen ? window.innerHeight - 100 : 700;
        const margin = { top: 40, right: 120, bottom: 40, left: 120 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Setup SVG
        svg.attr('width', width)
           .attr('height', height)
           .style('background-color', '#ffffff')
           .style('border-radius', '8px');

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Create tree layout
        const tree = d3.tree()
            .size([innerWidth, innerHeight])
            .separation((a, b) => (a.parent == b.parent ? 2.5 : 3.5));

        // Create hierarchy and compute layout
        const root = d3.hierarchy(data);
        const treeData = tree(root);

        // Create links
        const links = g.selectAll('.link')
            .data(treeData.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y))
            .style('fill', 'none')
            .style('stroke', d => {
                if (pathNodes.has(d.source.data.id) && pathNodes.has(d.target.data.id)) {
                    return '#4ade80';
                }
                return '#ccd6e0';
            })
            .style('stroke-width', d => {
                if (pathNodes.has(d.source.data.id) && pathNodes.has(d.target.data.id)) {
                    return '4px';
                }
                return '2px';
            });

        // Create nodes
        const nodes = g.selectAll('.node')
            .data(treeData.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x},${d.y})`);

        // Add circles for nodes
        nodes.append('circle')
            .attr('r', 40)
            .style('fill', d => pathNodes.has(d.data.id) ? '#f0fdf4' : '#fff')
            .style('stroke', d => pathNodes.has(d.data.id) ? '#4ade80' : '#3b82f6')
            .style('stroke-width', d => pathNodes.has(d.data.id) ? '4px' : '3px')
            .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');

        // Add ID labels
        nodes.append('text')
            .attr('dy', '-15')
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', '#6b7280')
            .style('font-family', 'monospace')
            .text(d => `ID: ${d.data.id}`);

        // Add name labels
        nodes.append('text')
            .attr('dy', '5')
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
            .style('fill', '#1f2937')
            .text(d => d.data.name);

        // Add title labels
        nodes.append('text')
            .attr('dy', '25')
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', '#6b7280')
            .text(d => d.data.title);

        // Add hover effects
        nodes.each(function() {
            const node = d3.select(this);
            const circle = node.select('circle');
            const originalFill = circle.style('fill');
            const originalStroke = circle.style('stroke');
            
            node.on('mouseover', function() {
                circle.transition()
                    .duration(200)
                    .style('fill', d => pathNodes.has(d.data.id) ? '#dcfce7' : '#f0f9ff')
                    .style('stroke', d => pathNodes.has(d.data.id) ? '#22c55e' : '#2563eb')
                    .attr('r', 45);
                this.parentNode.appendChild(this);
            })
            .on('mouseout', function() {
                circle.transition()
                    .duration(200)
                    .style('fill', originalFill)
                    .style('stroke', originalStroke)
                    .attr('r', 40);
            });
        });

    }, [data, searchId, isFullscreen]); // Added isFullscreen to dependencies

    // Handle escape key to exit fullscreen
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isFullscreen]);

    return (
        <div 
            ref={containerRef}
            className={`tree-container ${isFullscreen ? 'fullscreen' : ''}`}
        >
            <button
                onClick={toggleFullscreen}
                className="fullscreen-button"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9h6V3H3v6zm0 12h6v-6H3v6zm12 0h6v-6h-6v6zm0-18v6h6V3h-6z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h6v2H5v4H3V3zm12 0h6v6h-2V5h-4V3zM3 21v-6h2v4h4v2H3zm16-4v4h-4v2h6v-6h-2z"/>
                    </svg>
                )}
            </button>
            <div className="tree-visualization">
                <svg 
                    ref={svgRef}
                    className="mx-auto"
                    style={{
                        minWidth: isFullscreen ? '100%' : '960px',
                        maxWidth: '100%'
                    }}
                ></svg>
            </div>
        </div>
    );
};

export default TreeVisualization;

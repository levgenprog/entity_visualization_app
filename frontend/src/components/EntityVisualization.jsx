import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const EntityVisualization = () => {
    const entities = useSelector((state) => state.entities);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const axisMargin = 20;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Find the largest coordinates among all entities
        const maxCoordinate = entities.reduce((max, entity) => ({
            x: Math.max(max.x, Math.abs(entity.x)),
            y: Math.max(max.y, Math.abs(entity.y)),
        }),
            { x: 0, y: 0 }
        );

        // Calculate the scale based on the largest coordinates
        const scaleX = (canvasWidth - axisMargin * 2) / (2 * maxCoordinate.x);
        const scaleY = (canvasHeight - axisMargin * 2) / (2 * maxCoordinate.y);

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw X and Y axes
        ctx.beginPath();
        ctx.moveTo(axisMargin, canvasHeight / 2);
        ctx.lineTo(canvasWidth - axisMargin, canvasHeight / 2);
        ctx.moveTo(canvasWidth / 2, axisMargin);
        ctx.lineTo(canvasWidth / 2, canvasHeight - axisMargin);
        ctx.strokeStyle = 'black';
        ctx.stroke();

        // Draw X-axis markings and numbers
        const xStep = Math.ceil(maxCoordinate.x / 10);
        for (let x = -maxCoordinate.x; x <= maxCoordinate.x; x += xStep) {
            const xPos = canvasWidth / 2 + x * scaleX;
            ctx.beginPath();
            ctx.moveTo(xPos, canvasHeight / 2 - 5);
            ctx.lineTo(xPos, canvasHeight / 2 + 5);
            ctx.stroke();
            ctx.fillText(x.toString(), xPos - 8, canvasHeight / 2 + 20);
        }

        // Draw Y-axis markings and numbers
        const yStep = Math.ceil(maxCoordinate.y / 10);
        for (let y = -maxCoordinate.y; y <= maxCoordinate.y; y += yStep) {
            const yPos = canvasHeight / 2 - y * scaleY;
            ctx.beginPath();
            ctx.moveTo(canvasWidth / 2 - 5, yPos);
            ctx.lineTo(canvasWidth / 2 + 5, yPos);
            ctx.stroke();
            ctx.fillText(y.toString(), canvasWidth / 2 + 10, yPos + 5);
        }

        // Draw entities
        entities.forEach((entity) => {
            const x = canvasWidth / 2 + entity.x * scaleX;
            const y = canvasHeight / 2 - entity.y * scaleY;

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.stroke();
        });
    }, [entities]);

    return (
        <div>
            <h2>Dataset Visualization</h2>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                style={{ border: '1px solid black' }}
            />
        </div>
    );
}

export default EntityVisualization;
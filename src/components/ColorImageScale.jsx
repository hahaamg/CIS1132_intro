import React, { useState, useMemo } from 'react';
import rawData from '../assets/cis174_ccoms_data.json';
import Header from './ColorImageScale/Header';
import Footer from './ColorImageScale/Footer';
import ScatterPlot from './ColorImageScale/ScatterPlot';
import DetailsPanel from './ColorImageScale/DetailsPanel';
import ClassLegend from './ColorImageScale/ClassLegend';
import TagMenu from './ColorImageScale/TagMenu';

const ColorImageScale = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);

    const dataPoints = useMemo(() => {
        return Array.isArray(rawData) ? rawData : Object.values(rawData);
    }, []);

    const activeNode = hoveredNode || selectedNode;

    const activeVariations = useMemo(() => {
        if (!activeNode) return [];
        const uniqueVariations = [];
        const seen = new Set();

        // 1. 篩選：找出所有 image 名稱與當前選中節點相同的資料
        dataPoints.filter(p => p.image === activeNode.image).forEach(p => {
            // 2. 去重：避免顯示重複的色彩組合
            const key = JSON.stringify(p.clst); // 將色彩陣列轉為字串作為 Key
            if (!seen.has(key)) {
                seen.add(key);
                uniqueVariations.push(p); // 將不重複的資料點加入結果
            }
        });
        return uniqueVariations;
    }, [activeNode, dataPoints]);

    const uniqueImages = useMemo(() => {
        const map = new Map();
        dataPoints.forEach(p => {
            if (!map.has(p.image)) {
                map.set(p.image, { image: p.image, image_cht: p.image_cht });
            }
        });
        return Array.from(map.values()).sort((a, b) => a.image.localeCompare(b.image));
    }, [dataPoints]);

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans-tc p-4 md:p-6">
            <div className="max-w-7xl mx-auto flex flex-col w-full gap-6">
                
                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 order-3 md:order-2">
                    <ScatterPlot 
                        data={dataPoints}
                        selectedNode={selectedNode}
                        hoveredNode={hoveredNode}
                        onSelect={setSelectedNode}
                        onHover={setHoveredNode}
                    />

                    <div className="lg:col-span-1 flex flex-col gap-4 h-[500px] lg:h-[600px]">
                        <DetailsPanel 
                            activeNode={activeNode}
                            variations={activeVariations}
                            onClose={() => setSelectedNode(null)}
                            selectedNode={selectedNode}
                        />
                        <ClassLegend />
                    </div>
                </div>

                <TagMenu 
                    images={uniqueImages}
                    activeImage={activeNode?.image}
                    onSelect={(img) => {
                        const node = dataPoints.find(p => p.image === img);
                        if (node) setSelectedNode(node);
                    }}
                />

                <Footer />
            </div>
        </div>
    );
};

export default ColorImageScale;

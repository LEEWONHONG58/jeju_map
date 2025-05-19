
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { GeoNode, GeoLink, GeoJsonGeometry, GeoCoordinates, GeoJsonNodeProperties, GeoJsonLinkProperties } from './GeoJsonTypes';

interface GeoJsonLoaderProps {
  isMapInitialized: boolean;
  isNaverLoaded: boolean;
  onLoadSuccess: (nodes: GeoNode[], links: GeoLink[]) => void;
  onLoadError: (error: Error) => void;
}

const GeoJsonLoader: React.FC<GeoJsonLoaderProps> = ({
  isMapInitialized,
  isNaverLoaded,
  onLoadSuccess,
  onLoadError
}) => {
  useEffect(() => {
    const loadGeoJsonData = async () => {
      if (!isMapInitialized || !isNaverLoaded) {
        return;
      }
      
      try {
        // 노드와 링크 데이터를 동시에 가져옴
        console.log('GeoJsonLoader: 데이터 파일 로드 시작');
        const [nodeRes, linkRes] = await Promise.all([
          fetch('/data/NODE_JSON.geojson'),
          fetch('/data/LINK_JSON.geojson')
        ]);
        
        if (!nodeRes.ok || !linkRes.ok) {
          throw new Error('GeoJSON 데이터를 가져오는데 실패했습니다.');
        }
        
        // JSON으로 변환
        const [nodeJson, linkJson] = await Promise.all([
          nodeRes.json(),
          linkRes.json()
        ]);
        
        console.log('GeoJsonLoader: GeoJSON 데이터 로드 완료', {
          노드: nodeJson.features.length,
          링크: linkJson.features.length
        });
        
        // 노드 객체 생성
        const nodes = nodeJson.features.map((feature: any): GeoNode => {
          const id = String(feature.properties.NODE_ID);
          const coordinates = feature.geometry.coordinates as GeoCoordinates;
          
          return {
            id,
            type: 'node',
            geometry: feature.geometry as GeoJsonGeometry,
            properties: feature.properties as GeoJsonNodeProperties,
            coordinates,
            adjacentLinks: [],
            adjacentNodes: [],
            setStyles: (styles: any) => {
              // 스타일 설정 로직 (마커 생성 시 구현)
            }
          };
        });
        
        // 링크 객체 생성 및 노드 인접 링크/노드 설정
        const links = linkJson.features.map((feature: any): GeoLink => {
          const id = String(feature.properties.LINK_ID);
          const fromNodeId = String(feature.properties.F_NODE);
          const toNodeId = String(feature.properties.T_NODE);
          const length = feature.properties.LENGTH || 0;
          
          // 노드 인접 링크 및 노드 업데이트
          const fromNode = nodes.find(node => node.id === fromNodeId);
          const toNode = nodes.find(node => node.id === toNodeId);
          
          if (fromNode) {
            fromNode.adjacentLinks.push(id);
            if (toNodeId) fromNode.adjacentNodes.push(toNodeId);
          }
          
          if (toNode) {
            toNode.adjacentLinks.push(id);
            if (fromNodeId) toNode.adjacentNodes.push(fromNodeId);
          }
          
          return {
            id,
            type: 'link',
            geometry: feature.geometry as GeoJsonGeometry,
            properties: feature.properties as GeoJsonLinkProperties,
            coordinates: feature.geometry.coordinates as GeoCoordinates[],
            fromNode: fromNodeId,
            toNode: toNodeId,
            length,
            setStyles: (styles: any) => {
              // 스타일 설정 로직 (폴리라인 생성 시 구현)
            }
          };
        });
        
        console.log('GeoJsonLoader: GeoJSON 데이터 처리 완료', {
          노드객체: nodes.length,
          링크객체: links.length
        });
        
        // 성공 콜백 호출
        onLoadSuccess(nodes as GeoNode[], links);
        
      } catch (error) {
        console.error('GeoJSON 데이터 로드 중 오류:', error);
        onLoadError(error instanceof Error ? error : new Error('GeoJSON 데이터 로드 실패'));
      }
    };
    
    loadGeoJsonData();
  }, [isMapInitialized, isNaverLoaded, onLoadSuccess, onLoadError]);
  
  return null;
};

export default GeoJsonLoader;

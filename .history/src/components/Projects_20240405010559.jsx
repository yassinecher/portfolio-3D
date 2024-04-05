import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "AppoitmentEase",
    url: "https://www.behance.net/gallery/195540733/AppoitmentEase",
    image: "projects/appotmentease.jpg",
    description: "Angular, Springboot, openAi api",
  },
  {
    title: "GamingGear",
    url: "https://www.behance.net/gallery/195543119/GamingGear",
    image: "projects/gaminggear.jpg",
    description: "NextJs, postgresql, tailwind, Prismadb",
  },
  {
    title: "AuxtarGroup",
    url: "https://www.behance.net/gallery/195545695/Auxstargroup",
    image: "projects/auxtar.jpg",
    description: "Wordpress, Elementor",
  },
 
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group position-y={-2} {...props}>
      <mesh
        position-z={-0.002}
       
          ref={background} 
      >
        <planeGeometry args={[6.2, 7.2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[6.2,6.2 , 0.001]}
        url={project.image}
        toneMapped={false}
        position-y={1}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.3}
        position={[-2.5, -2.2,  -0.001]}
        font="bold"
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={5}
        anchorX="left"
        anchorY="top"
        fontSize={0.2}
        position={[-2.5, -2.5,  0]}
      >
        {project.description}
      </Text>
      <mesh
       position={[-1.8, -2.95,  0]}
       position-z={ -0.001}
       onClick={() => window.open(project.url, "_blank")}
       
      >
        <planeGeometry args={[1.4, 0.3]} />
        <meshBasicMaterial color="#f59e0b"  transparent opacity={1} />
      </mesh>
            <Text
         
            
            position={[-2.35 , -2.85, 0]}
       
            maxWidth={5}
            fontSize={0.2}
            anchorX="left"
            anchorY="top"
            color="black"
            
            paddingX={0.2}
            paddingY={0.1}
            borderRadius={0.05}
            borderColor="white"
            borderWidth={0.01}
       
      >
        View Details
      </Text>
         </group>
  
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 8.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};

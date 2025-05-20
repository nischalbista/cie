"use client";
import React from "react";

interface ImageBannerProps {
  src: string;
  mobileSrc?: string;
  alt?: string;
  marginVertical?: boolean;
  marginTop?: boolean;
  marginBottom?: boolean;
  link?: string;
}

const ImageBanner: React.FC<ImageBannerProps> = ({
  src,
  mobileSrc,
  alt,
  marginVertical,
  marginTop,
  marginBottom,
  link = "https://app.homeschool.asia/signup",
}) => {
  const sectionClass = `
    image-banner 
    ${marginVertical ? "margin-vertical" : ""} 
    ${marginTop ? "margin-top" : ""} 
    ${marginBottom ? "margin-bottom" : ""}
  `.trim();

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className={sectionClass}>
        <img
          className={`image-banner__image ${
            mobileSrc ? "image-banner__image--desktop" : ""
          }`}
          src={src}
          alt={alt}
        />

        {mobileSrc && (
          <img
            className="image-banner__image image-banner__image--mobile"
            src={mobileSrc}
            alt={alt}
          />
        )}
      </div>
    </a>
  );
};

export default ImageBanner;

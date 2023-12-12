<VisibilitySensor partialVisibility>
  {({ isVisible, Once }) => (
  <DetailContainer>
    <DetailTitle>{detail.title}</DetailTitle>
    <Markdown>{detail.description}</Markdown>
    { isVisible
      ? (
          <MediaContainer>
            {
              detail.media.map(src => (
              <Video playsInline muted loop autoPlay preload="metadata" key={src} controls>
                <source src={`${src}#t=0.1`} />
              </Video>
              ))
            }
          </MediaContainer>
        )
      : <span />
    }
  </DetailContainer>
</VisibilitySensor>

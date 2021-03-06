import * as React from "react";
import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "./Modal";

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [imageParams, setImageParams] = useState({});

  useEffect(() => {
    setLoading(true);
    axios.get(`/list`, { params: { page, limit: 10 } }).then((data) => {
      setImages((prevImages) => [...prevImages, ...data]);
      setLoading(false);
    });
  }, [page]);

  const handleClick = () => {
    setPage((page) => page + 1);
  };

  const handleOpen = (image) => () => {
    setImageParams(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <ImageList
          sx={{ width: 1000, height: 500, cursor: "pointer" }}
          cols={2}
          rowHeight={400}
        >
          {images.map((image) => (
            <ImageListItem key={image.id} onClick={handleOpen(image)}>
              <img
                key={image.id}
                src={`${image.download_url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${image.download_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={image.author}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>

        <Modal open={open} onClose={handleClose} params={imageParams} />
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" onClick={handleClick}>
            Show More
          </Button>
        )}
      </Box>
    </>
  );
};

export default ImagesList;

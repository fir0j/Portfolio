FROM node:buster

# choose pwd inside the container
WORKDIR /home/frontend/portfolio

COPY ./ /home/frontend/portfolio

RUN npm install

CMD ["/bin/bash"]

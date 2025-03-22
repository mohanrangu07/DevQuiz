{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # Use OpenJDK 17 as base image\
FROM openjdk:17-jdk-slim\
\
# Set working directory\
WORKDIR /app\
\
# Copy JAR file to the container\
COPY target/*.jar app.jar\
\
# Expose the port your app runs on\
EXPOSE 8080\
\
# Run the JAR file\
ENTRYPOINT ["java", "-jar", "app.jar"]\
}
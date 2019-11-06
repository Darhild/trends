
FROM snakepacker/python:all as builder

# Create virtualenv
RUN python3 -m venv /app
ENV PATH="/app/bin:${PATH}"

WORKDIR /tmp
# Install requirements on separate step for better cache
COPY requirements.txt /tmp
RUN pip install -r requirements.txt

# Install app as python module
COPY . /tmp
RUN python setup.py build install

# App layer
FROM snakepacker/python:3.7 as app

ENV PATH="/app/bin:${PATH}"
COPY --from=builder /app /app
COPY --from=builder /tmp /app

EXPOSE 8080
CMD ["python3", "/app/app.py"]
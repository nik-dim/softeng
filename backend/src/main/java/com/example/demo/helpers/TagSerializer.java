package com.example.demo.helpers;

import com.example.demo.model.Tag;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.json.JSONArray;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class TagSerializer extends StdSerializer<List<Tag>> {

    public TagSerializer() {
        this(null);
    }

    public TagSerializer(Class<List<Tag>> t) {
        super(t);
    }

    @Override
    public void serialize(
            List<Tag> values, JsonGenerator jgen, SerializerProvider provider)
            throws IOException, JsonProcessingException {

        jgen.writeStartArray();
        for (Tag value : values){
            jgen.writeObject(value.getValue());
        }
        jgen.writeEndArray();
    }
}
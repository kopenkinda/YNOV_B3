package com.example.cours05_1;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {
    String android = "crap";

    @Test
    public void addition_isCorrect() {
        assertEquals(4, 2 + 2);
    }

    @Test
    public void android_is_aPieceOfCrap() {
        assertEquals(android, "crap");
    }

    @Test
    public void android_is_notGood() {
        assertNotEquals(android, "good");
    }
}
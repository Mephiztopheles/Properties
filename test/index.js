var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import StringProperty from "../properties/StringProperty.js";
import NumberProperty from "../properties/NumberProperty.js";
import RegExProperty from "../properties/RegExProperty.js";
import TestCase, { assertEquals, assertFalse, assertTrue, test } from "../node_modules/@mephiztopheles/test/TestCase.js";
class PropertyTest extends TestCase {
    testString() {
        let property = new StringProperty("lol");
        let changed = new StringProperty();
        changed.bind(property);
        assertEquals("lol", changed.value);
        let left = new StringProperty("Wirklich? ");
        let concat = left.concat(changed);
        left.value = "Hallo ";
        changed.value = "Markus";
        assertEquals("Hallo Markus", concat.value);
        let regex = new RegExProperty(/l/);
        let matching = property.matches(regex);
        assertTrue(matching.value);
        regex.value = /a/;
        assertFalse(matching.value);
    }
    testNumber() {
        let number = new NumberProperty(200);
        let divider = new NumberProperty(10);
        let multiply = number.multiply(divider);
        let divided = number.divide(divider);
        assertEquals(20, divided.value);
        assertEquals(210, number.add(divider).value);
        assertEquals(190, number.subtract(divider).value);
        assertEquals(2000, multiply.value);
        divider.value = 2;
        assertEquals(400, multiply.value);
        divider.value = number.value;
        assertEquals(40000, multiply.value);
    }
    testBoolean() {
        let n1 = new NumberProperty(200);
        let n2 = new NumberProperty(10);
        let gt = n1.greaterThan(n2);
        let lt = n1.lowerThan(n2);
        assertTrue(gt.value);
        assertFalse(lt.value);
        n1.value = 9;
        assertFalse(gt.value);
        assertTrue(lt.value);
        n1.value = 10;
        assertFalse(gt.value);
        assertFalse(lt.value);
        let not = gt.not();
        assertTrue(not.value);
        let and = gt.and(lt);
        assertFalse(and.value);
        n1.value = 9;
        assertFalse(gt.value);
        assertTrue(lt.value);
        let or = gt.or(lt);
        assertTrue(or.value);
    }
}
__decorate([
    test
], PropertyTest.prototype, "testString", null);
__decorate([
    test
], PropertyTest.prototype, "testNumber", null);
__decorate([
    test
], PropertyTest.prototype, "testBoolean", null);
new PropertyTest().run();
//# sourceMappingURL=index.js.map